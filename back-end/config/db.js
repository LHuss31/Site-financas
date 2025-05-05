import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Banco de dados conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro ao conectar ao banco de dados: ${error.message}`);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

export default connectDB;