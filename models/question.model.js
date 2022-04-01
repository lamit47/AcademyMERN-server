import mongoose from 'mongoose';

const questionSchema = mongoose.Schema(
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
questionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
questionSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});


const Question = mongoose.model("Question", questionSchema);

export default Question;