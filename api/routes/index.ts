// api/routes/index.ts
import express from 'express';
import productsRouter from './productsRouter'; // Import en tant qu'export par défaut

const router = express.Router();

// Utilisez pnjRouter pour gérer toutes les routes commençant par '/pnj'
router.use('/products', productsRouter);

// Montez la route `/test` sur l'application Express principale
router.get('/test', async (req, res) => {
  res.send('Hello from /test');
});

export default router;
