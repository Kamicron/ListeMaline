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


router.get('/me', async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1]; // Récupère l'accessToken depuis les headers

    if (!accessToken) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
    
    const userId = jwt.decode(accessToken).id;

    const connection = getConnection(); 

    // Récupérer les paniers de l'utilisateur qui lui sont attribués via user_cart
    const [cartRows]: any[] = await connection.query(`
      SELECT c.* FROM carts c
      JOIN user_cart uc ON c.cart_id = uc.cart_id
      WHERE uc.user_id = ?;
    `, [userId]);

    // Pour chaque panier, récupérer les produits associés avec leur quantité
    const cartsWithProducts = await Promise.all(cartRows.map(async (cart: any) => {
      const [productRows]: any[] = await connection.query(`
        SELECT p.*, ci.quantity FROM products p
        JOIN cart_items ci ON p.id = ci.product_id
        WHERE ci.cart_id = ?;
      `, [cart.cart_id]);
      
      // Récupérer les informations sur la catégorie pour chaque produit
      const productsWithCategory = await Promise.all(productRows.map(async (product: any) => {
        const [categoryRow]: any[] = await connection.query(`
          SELECT * FROM categories WHERE id = ?;
        `, [product.category_id]);
        
        const category = categoryRow[0]; // Supposant que la catégorie existe
        
        // Formatter la catégorie dans le format requis
        const formattedCategory = {
          id: category.id,
          icon: category.icon,
          name: category.name
        };

        // Exclure la clé "category_id" et ajouter les informations de la catégorie
        delete product.category_id;
        product.category = formattedCategory;

        return product;
      }));
      
      return {
        ...cart,
        products: productsWithCategory
      };
    }));

    // Pour chaque panier, récupérer les utilisateurs partageant le panier
    const cartsWithUsers = await Promise.all(cartsWithProducts.map(async (cart: any) => {
      const [userRows]: any[] = await connection.query(`
        SELECT user_id FROM user_cart WHERE cart_id = ?;
      `, [cart.cart_id]);
    
      const sharedUserIds = userRows.map((row: any) => row.user_id);
    
      // Récupérer les informations des utilisateurs partageant le panier
      const sharedUsersPromises = sharedUserIds.map(async (userId: any) => {
        console.log('userId', userId);
    
        const [rows]: any[] = await connection.query(`
          SELECT id, name FROM users WHERE id = ?;
        `, [userId]);
    
        const userRow = rows[0]; // Récupérer le premier élément du tableau de résultats
    
        return {
          id: userRow.id,
          name: userRow.name
        };
      });
    
      const sharedUsers = await Promise.all(sharedUsersPromises);
      console.log('sharedUsers', sharedUsers);
    
      // Créer un nouvel objet sans la propriété user_id
      const result = {
        ...cart,
        shared_users: sharedUsers
      };
    
      delete result.user_id; // Supprimer la propriété user_id
    
      return result;
    }));
    
    
    
    
    

    res.json(cartsWithUsers);
  } catch (error) {
    console.error('Erreur lors de la récupération des paniers de l\'utilisateur : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

router.post('/add-product', async (req, res) => {
  try {
    const { productId, cartId }: { productId: number, cartId: number } = req.body; // Récupérer l'identifiant du produit et l'identifiant du panier depuis le corps de la requête
    const accessToken = req.headers.authorization?.split(' ')[1]; // Récupérer l'accessToken depuis les headers

    if (!accessToken) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
    
    const userId = jwt.decode(accessToken).id;

    const connection = getConnection(); 

    // Vérifier si le produit existe
    const [product]: any[] = await connection.query(`
      SELECT * FROM products WHERE id = ?;
    `, [productId]);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Vérifier si le panier appartient à l'utilisateur
    const [cart]: any[] = await connection.query(`
      SELECT * FROM carts WHERE cart_id = ? AND user_id = ?;
    `, [cartId, userId]);

    if (!cart) {
      return res.status(403).json({ error: 'Cart not found or does not belong to the user' });
    }

    // Ajouter le produit au panier spécifié
    await connection.query(`
      INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, 1);
    `, [cartId, productId]);

    res.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit au panier : ', error);
    res.status(500).send('Erreur interne du serveur');
  }
});



export default router;
