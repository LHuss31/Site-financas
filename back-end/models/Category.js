import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Relaciona a categoria ao usuário
  name: { type: String, required: true }, // Nome da categoria
  value: { type: Number, required: true }, // Valor associado à categoria
}, { timestamps: true }); // Adiciona campos de criação e atualização

const Category = mongoose.model('Category', categorySchema);

export default Category;