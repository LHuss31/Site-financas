import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  renda: {type: Number, required: false },
  dia: {type: Number, required: false },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;