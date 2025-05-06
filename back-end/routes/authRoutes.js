import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const editSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  renda: Joi.number().positive().optional(),
  senha: Joi.string().min(6).optional(),
  dia: Joi.number().integer().min(1).max(31).optional(),
});

const router = express.Router();

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().min(1).required(),
});

router.post('/cadastro', async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Dados inválidos!', error: error.details });
    }

    const { email, senha } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);
        const newUser = new User({ email, senha: hashedPassword });
        await newUser.save();

        const token = jwt.sign(
            { userID: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );

        res.status(201).json({ message: "Usuário cadastrado com sucesso!", userId: newUser._id, token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar usuário!", error: error.message });
    }
});

  router.put('/editar', authMiddleware, async (req, res) => {
    const { error } = editSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Dados inválidos!', error: error.details });
    }
  
    const { name, email, renda, senha, dia } = req.body;
  
    try {
      const updateData = { name, email, renda, dia };
  
      // Criptografa a senha, se fornecida
      if (senha) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        updateData.senha = hashedPassword;
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        updateData,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
      }
  
      res.json({ message: 'Tudo certo!', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao completar informações', error: error.message });
    }
  });
  
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
});

router.post('/login', async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Dados inválidos!', error: error.details });
    }

    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(401).json({ message: 'Senha incorreta!' });
        }

        const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );

        res.json({ message: `Usuário logado com sucesso`, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao fazer o login', error: error.message });
    }
});

router.put('/atualizar', authMiddleware, async (req, res) => {
    const { name, renda, dia } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.userId, // Obtém o userId do token decodificado pelo authMiddleware
        { name, renda, dia },
        { new: true } // Retorna o documento atualizado
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
      }
  
      res.json({ message: 'Informações atualizadas com sucesso!', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar informações', error: error.message });
    }
  });
  export default router;