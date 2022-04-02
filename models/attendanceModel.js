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
  

// Duplicate the ID field.
attendanceSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
attendanceSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;