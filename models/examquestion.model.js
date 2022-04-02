import mongoose from 'mongoose';

const examQuestionSchema = mongoose.Schema(
  {
    examId: {
      type: Object,
      require: true
    },
    content: {
      type: String,
      require: true
    },
    options: [{
      content: {
        type: String,
        require: true
      }
    }],
    rightOption: {
      type: Number,
      require: true
    },
    isDeleted: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Duplicate the ID field.
examQuestionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
examQuestionSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});


const ExamQuestion = mongoose.model("ExamQuestion", examQuestionSchema);

export default ExamQuestion;