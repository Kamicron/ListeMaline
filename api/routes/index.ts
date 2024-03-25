// api/routes/index.ts
import express from 'express';
import productsRouter from './productsRouter';
import categoriesRouter from './categoriesRouter';
import usersRouter from './usersRouter';
import cartsRouter from './cartsRouter';
import testRouter from './test'; // Importez le routeur test

const router = express.Router();

router.use('/test', testRouter); // Montez le routeur test sur /test
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/users', usersRouter);
router.use('/carts', cartsRouter);

router.get('/test', async (req, res) => { // Changez la route de '/test' à '/'
  console.log('test');
  res.send('Htestt');
});

export default router;
