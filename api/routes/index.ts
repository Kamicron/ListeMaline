// api/routes/index.ts
import express from 'express';
import productsRouter from './productsRouter'; // Import en tant qu'export par défaut
import categoriesRouter from './categoriesRouter';

const router = express.Router();

// Utilisez productsRouter pour gérer toutes les routes commençant par '/products'
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);

// Montez la route `/test` sur productsRouter
router.get('/test', async (req, res) => {
  res.send('Hello from /test');
});

export default router;
