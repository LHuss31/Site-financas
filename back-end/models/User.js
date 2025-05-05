import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  renda: {type: Number, required: true },
  dia: {type: Number, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;