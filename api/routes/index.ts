import express from 'express';
import productsRouter from './productsRouter'; // Import en tant qu'export par défaut
console.log('coucou')
const router = express.Router();
console.log('Router: ', router);
// Utilisez pnjRouter pour gérer toutes les routes commençant par '/pnj'
router.use('/products', productsRouter);

export default router;
