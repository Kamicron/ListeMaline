// api/productsRouter.ts
import express from 'express';
import { getConnection } from '../config/db';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const connection = getConnection(); 

    const [rows]: any[] = await connection.query(`
      SELECT p.*, JSON_OBJECT('id', c.id, 'name', c.name, 'icon', c.icon) AS category
      FROM products p
      JOIN categories c ON p.category_id = c.id;
    `);

    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});



router.get('/category/:category_id', async (req, res) => {
  try {
    const connection = getConnection(); 

    const [rows]: any[] = await connection.query('SELECT * FROM `products` WHERE category_id = ?', [req.params.category_id]);

    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits par catégorie : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const connection = getConnection(); 

    const [rows]: any[] = await connection.query('SELECT * FROM `products` WHERE id = ?', [req.params.id]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit par ID : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

router.get('/search/:name', async (req, res) => {
  try {

    const connection = getConnection();

    const [rows]: any[] = await connection.query('SELECT * FROM `products` WHERE name LIKE ?', [`%${req.params.name}%`]);

    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la recherche des produits par nom : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

export default router;
