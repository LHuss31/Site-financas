import express from 'express';
import Category from '../models/Category.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import Joi from 'joi';

const router = express.Router();

const categorySchema = Joi.object({
    name: Joi.string().required(),
    value: Joi.number().positive().required(),
  });
  
  router.post('/', authMiddleware, async (req, res) => {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Dados inválidos!', error: error.details });
    }
  
    const { name, value } = req.body;
  
    try {
      const newCategory = new Category({
        userId: req.userId,
        name,
        value,
      });
  
      await newCategory.save();
      res.status(201).json({ message: 'Categoria criada com sucesso!', category: newCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar categoria', error: error.message });
    }
  });

// Rota para listar todas as categorias do usuário
router.get('/', authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.userId }); // Busca categorias do usuário autenticado
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar categorias', error: error.message });
  }
});

// Rota para excluir uma categoria
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findOneAndDelete({ _id: id, userId: req.userId }); // Garante que o usuário só exclua suas categorias

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Categoria não encontrada!' });
    }

    res.json({ message: 'Categoria excluída com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir categoria', error: error.message });
  }
});

export default router;