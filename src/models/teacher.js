import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    code: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    teacherPositionsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teacherpositions' }],
    degrees: [{
      type: { type: String },
      school: { type: String },
      major: { type: String },
      year: { type: Number },
      isGraduated: { type: Boolean }
    }]
  });

  const teacherModel = mongoose.model('teachers', teacherSchema)
  export default teacherModel