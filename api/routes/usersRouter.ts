require('dotenv').config ();
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import { getConnection } from '../config/db';


// api/routes/test.ts
// import express from 'express';
app.use(express.json());

const router = express.Router();

router.get('/test', async (req, res) => { // Changez la route de '/test' à '/'
  console.log('test');
  res.send('test venant de api/test/test');
});


router.get('/loginTest', async (req, res) => { // Changez la route de '/test' à '/'
  console.log('test');
  res.send('test venant de api/test/test');
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

export default router;
