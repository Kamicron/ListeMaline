// api/productsRouter.ts
import express from 'express';
import { getConnection } from '../config/db'; // Import corrigé

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Récupérez la connexion à la base de données
    const connection = getConnection(); // Utilisation de getConnection()

    // Exécutez votre requête SQL pour récupérer tous les produits
    const [rows]: any[] = await connection.query('SELECT * FROM `products` WHERE 1');

    // Envoyez les produits en réponse
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

export default router;
