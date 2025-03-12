import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: false, unique: true },
  address: { type: String, required: false },
  dob: { type: Date, required: false },
  name: { type: String, required: true },
  identity: { type: String, required: false,  },
  phoneNumber: { type: String,   },
  role: { type: String, enum: ['STUDENT', 'TEACHER', 'ADMIN'], required: true },
  isDeleted: { type: Boolean, default: false },

}, {timestamp: true}); // Thêm timestamps để có createdAt và updatedAt

const userModel = mongoose.model('users', userSchema);
export default userModel;