// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = mongoose.Schema(
//     {
//       name: {
//         type: String,
//         required: true,
//       },
//       email: {
//         type: String,
//         required: true,
//         unique: true,
//       },
//       password: {
//         type: String,
//         required: true,
//       },
//       isAdmin: {
//         type: Boolean,
//         required: true,
//         default: false,
//       },
//       pic: {
//         type: String,
//         required: true,
//         default:
//           "https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/273173102_3161739647436037_2140226937470340868_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=k2LL5AxHdtEAX87soSj&_nc_ht=scontent.fsgn5-8.fna&oh=00_AT-gWKMOdDA5Vaexzm2y7cdLKyte4S9V_M7JPxFsR5GRVQ&oe=6240BE78",
//       },
//     },
//     {
//       timestamps: true,
//     }
// );

// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
//   };

// userSchema.pre("save", async function (next) {
// if (!this.isModified("password")) {
//         next();
// }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });
  
// const User = mongoose.model("User", userSchema);

// export default User;