import express from 'express';
import { getConnection } from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const router = express.Router();

// Route pour créer un utilisateur
router.post('/register', async (req, res) => {
  try {
    console.log('test');
    
    const { name, email, password } = req.body;
    const connection = getConnection();

    // Vérifier si l'utilisateur existe déjà
    const [rows]: any[] = await connection.query(`
      SELECT * FROM users WHERE email = ?
    `, [email]);

    if (rows.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'utilisateur dans la base de données
    await connection.query(`
      INSERT INTO users (name, email, password) VALUES (?, ?, ?)
    `, [name, email, hashedPassword]);

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

// Route pour se connecter
// Route pour se connecter
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const connection = getConnection();

    // Récupérer l'utilisateur par email
    const [rows]: any[] = await connection.query(`
      SELECT * FROM users WHERE email = ?
    `, [email]);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Générer le token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Stocker le token JWT dans un cookie sécurisé
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});



// Route pour mettre à jour l'utilisateur
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const connection = getConnection();

    // Vérifier si l'utilisateur existe
    const [rows]: any[] = await connection.query(`
      SELECT * FROM users WHERE id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mettre à jour l'utilisateur
    await connection.query(`
      UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?
    `, [name, email, password, id]);

    res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

// Route pour supprimer l'utilisateur
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Vérifier si l'utilisateur existe
    const [rows]: any[] = await connection.query(`
      SELECT * FROM users WHERE id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Supprimer l'utilisateur
    await connection.query(`
      DELETE FROM users WHERE id = ?
    `, [id]);

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

// Route pour récupérer les informations d'un utilisateur par son ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = getConnection();

    // Récupérer l'utilisateur par son ID
    const [rows]: any[] = await connection.query(`
      SELECT * FROM users WHERE id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const user = rows[0];
    delete user.password; // Supprimer le mot de passe de la réponse

    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

router.get('/isLoggedIn', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token non fourni' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token invalide' });
      }

      // Le token est valide, l'utilisateur est connecté
      return res.status(200).json({ message: 'Utilisateur connecté' });
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du token : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});
export default router;

