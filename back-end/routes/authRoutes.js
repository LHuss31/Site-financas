import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rota para criar um novo usuário
router.post('/cadastro', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const newUser = new User({ email, senha });
        await newUser.save();

        const token = jwt.sign(
            { userID: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '3h'}
        );
    
        res.status(201).json({ message: "Usuario cadastrado com sucesso!", userId: newUser._id});
    } catch(error){
        console.error(error);
        res.status(500).json({ message: "Erro ao criar usuario!", error: error.message});
    }
  });

  router.put('/atualizar',authMiddleware, async (req, res) => {
    const { userId, name, renda, dia } = req.body;
  
    try {
      // Atualiza os dados do usuário
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, renda, dia },
        { new: true } // Retorna o documento atualizado
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
      }
  
      res.json({ message: 'Informações completas!', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao completar informações', error: error.message });
    }
  });
  
  router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try{
        const user = await User.findOne({ email });

        if(!user){
            return res.status(404).json({message: 'Usuario não encontrado!'});
        }

        if (user.senha !== senha) {
            return res.status(401).json({ message: 'Senha Incorreta!'});
        }
        const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '3h'}
        );

        res.json({ message: `Usuario logado com sucesso`, token});   
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro ao fazer o login', error: error.message});
    }
  });

  export default router;