// import { ObjectId } from 'mongodb';
// import mongoose from 'mongoose';

// const certificationSchema = mongoose.Schema(
//     {
//       questionId: {
//         type: ObjectId,
//         required: true,
//       },
//       userId: {
//         type: ObjectId,
//         required: true,
//       },
//       content: {
//         type: String,
//         required: true,
//       }
//     },
//     {
//       timestamps: true,
//     }
// );

// // Duplicate the ID field.
// certificationSchema.virtual('id').get(function () {
//   return this._id.toHexString();
// });

// // Ensure virtual fields are serialised.
// certificationSchema.set('toJSON', {
//   virtuals: true,
//   versionKey:false,
//   transform: function (doc, ret) {
//     delete ret._id
//   }
// });

// certificationSchema.set('toObject', {
//   virtuals: true,
//   versionKey:false,
//   transform: function (doc, ret) {
//     delete ret._id
//   }
// });

// const Answer = mongoose.model("Answer", certificationSchema);

// export default Answer;