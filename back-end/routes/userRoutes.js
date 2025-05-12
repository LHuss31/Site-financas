import express from 'express';

const router = express.Router();

// Rota para listar todos os usuários
router.get('/lista', (req, res) => {
  res.json({ message: 'Lista de usuários' });
});



export default router;