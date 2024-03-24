require('dotenv').config ();
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import { getConnection } from '../config/db';
import { authService } from '../services/authService';


// api/routes/test.ts
// import express from 'express';
app.use(express.json());

const router = express.Router();

router.get('/test', async (req, res) => { // Changez la route de '/test' à '/'
  console.log('test');
  res.send('test venant de api/test/test');
});


router.get('/details', async (req, res) => {
  const connection = getConnection();

  const accessToken = req.headers.authorization?.split(' ')[1]; // Récupère l'accessToken depuis les headers
  if (!accessToken) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  try {
    const decodedToken = jwt.decode(accessToken);

    const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id = ?', [decodedToken.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Récupération des détails de l'utilisateur à partir de la première ligne du résultat
    const userDetails = {
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      // Ajoutez d'autres champs si nécessaire
    };

    res.json(userDetails);
  } catch (error) {
    console.error('Error retrieving user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/login', async (req, res) => {
  const connection = getConnection();
  try {
    const [rows, fields] = await connection.execute('SELECT * FROM users WHERE name = ?', [req.body.name]);
    if (rows.length === 0) return res.status(400).send('Cannot find user');

    const user = rows[0];
    if (await bcrypt.compare(req.body.password, user.password)) {
      // Bonne authentification
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      // Vous pouvez stocker le token rafraîchissant dans la base de données ou dans un tableau en mémoire selon vos besoins.
      // Ici, nous ne stockons pas le rafraîchissement pour des raisons de simplicité.
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.status(401).send('Mot de passe incorrect');
    }
  } catch (error) {
    console.error('Erreur lors de la connexion : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

// Fonction pour générer le token d'accès
function generateAccessToken(user) {
  return jwt.sign({ id: user.id, name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

router.post('/register', async (req, res) => {
  const connection = getConnection();
  try {
    // Vérifier si l'utilisateur existe déjà dans la base de données
    const [existingUsers, _] = await connection.execute('SELECT * FROM users WHERE name = ?', [req.body.name]);
    if (existingUsers.length > 0) {
      return res.status(400).send('Utilisateur déjà existant');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Générer le token d'accès
    const user = { id: existingUsers.insertId, name: req.body.name };
    const accessToken = generateAccessToken(user);

    // Insérer l'utilisateur dans la base de données avec le champ email et token
    await connection.execute('INSERT INTO users (name, email, password, token) VALUES (?, ?, ?, ?)', [req.body.name, req.body.email, hashedPassword, accessToken]);

    res.status(201).send({ message: 'Utilisateur enregistré avec succès', accessToken });
  } catch (error) {
    console.error('Erreur lors de l\'inscription : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

// router.post('/logout', async (req, res) => {
//   const connection = getConnection();
//   try {
//     // Supprimer le token d'accès de l'utilisateur dans la base de données
//     await connection.execute('UPDATE users SET token = NULL WHERE id = ?', [req.body.id]);

//     res.status(200).send('Déconnexion réussie');
//   } catch (error) {
//     console.error('Erreur lors de la déconnexion : ', error);
//     res.status(500).send('Erreur interne du serveur');
//   }
// });




export default router;
