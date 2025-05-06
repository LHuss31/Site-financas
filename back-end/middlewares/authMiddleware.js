import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido!' });
  }

  const token = authHeader.split(' ')[1]; // Extrai o token do cabeçalho

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica o token
    req.userId = decoded.userID; // Adiciona o userId ao objeto req
    next(); // Continua para a próxima função
  } catch (error) {
    res.status(401).json({ message: 'Token inválido!' });
  }
};

export default authMiddleware;