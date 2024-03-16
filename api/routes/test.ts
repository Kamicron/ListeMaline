// api/routes/test.ts
import express from 'express';

const router = express.Router();

router.get('/test', async (req, res) => { // Changez la route de '/test' à '/'
  console.log('test');
  res.send('test venant de api/test/test');
});

export default router;
