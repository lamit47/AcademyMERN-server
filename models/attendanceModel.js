import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      courseId: {
        type: String,
        required: true,
      },
      credits: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
      versionKey: false
    }
);
  
const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;