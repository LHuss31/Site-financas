import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do cabeçalho Authorization

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica o token
    req.userId = decoded.userId; // Adiciona o userId ao objeto req
    next(); // Continua para a próxima função
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

export default authMiddleware;