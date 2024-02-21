import express from 'express';
import { getConnection } from '../config/db'; // Import corrigé
import { log } from 'console';

interface RowData {
  firstname: string;
}

const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    console.log('Products');
    
    // Récupérez la connexion à la base de données
    const connection = getConnection(); // Utilisation de getConnection()

    // Exécutez votre requête SQL pour récupérer un prénom aléatoire
    const [rows]: any[] = await connection.query('SELECT * FROM `products` WHERE 1 ORDER BY RAND() LIMIT 1');

    // Envoyez le prénom aléatoire en réponse
    res.json({ firstname: rows[0].label });
  } catch (error) {
    console.error('Erreur lors de la récupération du prénom : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

export default router;
