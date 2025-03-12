import mongoose from "mongoose";

const teacherPositionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    des: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
  }, {timestamp: true});

  const teacherPositionmodel = mongoose.model('teacherpositions', teacherPositionSchema)
  export default teacherPositionmodel