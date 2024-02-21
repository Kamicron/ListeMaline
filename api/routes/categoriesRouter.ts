// api/categoriesRouter.ts
import express from 'express';
import { getConnection } from '../config/db';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const connection = getConnection();
    const [rows]: any[] = await connection.query('SELECT * FROM `categories`');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

router.get('/search', async (req, res) => {
  try {
    const connection = getConnection();
    const { name } = req.query;
    if (!name) {
      return res.status(400).send('Le paramètre "name" est requis');
    }
    const [rows]: any[] = await connection.query('SELECT * FROM `categories` WHERE `name` LIKE ?', [`%${name}%`]);
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la recherche de la catégorie : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

export default router;
