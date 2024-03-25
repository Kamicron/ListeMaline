// api/cartsRouter.ts
import express from 'express';
import { getConnection } from '../config/db';
const jwt = require('jsonwebtoken')

const router = express.Router();

router.get('/test', async (req, res) => { // Changez la route de '/test' à '/'
  console.log('test');
  res.send('test venant de api/carts/test');
});

router.get('/', async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1]; // Récupère l'accessToken depuis les headers

    if (!accessToken) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
    
    const userId = jwt.decode(accessToken).id;

    const connection = getConnection(); 

    // Récupérer les paniers de l'utilisateur
    const [cartRows]: any[] = await connection.query(`
      SELECT * FROM carts WHERE user_id = ?;
    `, [userId]);

    // Pour chaque panier, récupérer les produits associés avec leur quantité
    const cartsWithProducts = await Promise.all(cartRows.map(async (cart: any) => {
      const [productRows]: any[] = await connection.query(`
        SELECT p.*, ci.quantity FROM products p
        JOIN cart_items ci ON p.id = ci.product_id
        WHERE ci.cart_id = ?;
      `, [cart.cart_id]);
      
      return {
        ...cart,
        products: productRows
      };
    }));

    // Pour chaque panier, récupérer les utilisateurs partageant le panier
    const cartsWithUsers = await Promise.all(cartsWithProducts.map(async (cart: any) => {
      const [userRows]: any[] = await connection.query(`
        SELECT user_id FROM user_cart WHERE cart_id = ?;
      `, [cart.cart_id]);

      const sharedUserIds = userRows.map((row: any) => row.user_id);

      return {
        ...cart,
        shared_user_ids: sharedUserIds
      };
    }));

    res.json(cartsWithUsers);
  } catch (error) {
    console.error('Erreur lors de la récupération des paniers de l\'utilisateur : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});



export default router;
