import express from 'express';

const router = express.Router();

// Rota para listar todos os usuários
router.get('/', (req, res) => {
  res.json({ message: 'Lista de usuários' });
});

// Rota para criar um novo usuário
router.post('/cadastro', (req, res) => {
  const { name, email, senha } = req.body;
  res.json({ message: `Usuário ${name} com email ${email} criado com sucesso!` });
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  res.json({ message: `Usuario ${email} entrou no servidor! `});
})

export default router;