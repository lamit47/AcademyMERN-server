// import asyncHandler from "express-async-handler";
// import User from "../models/authModel.js";
// import generateToken from "../utils/generateToken.js";

// //@description     Register new user
// //@route           POST /api/users/
// const registerUser = asyncHandler(async (req, res) => {
//     const { name, email, password, pic } = req.body;
  
//     const userExists = await User.findOne({ email });
  
//     if (userExists) {
//       res.status(404);
//       throw new Error("User already exists");
//     }
  
//     const user = await User.create({
//       name,
//       email,
//       password,
//       pic,
//     });
  
//     if (user) {
//       res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         pic: user.pic,
//         acessToken: generateToken(user._id),
//       });
//     } else {
//       res.status(400);
//       throw new Error("User not found");
//     }
//   });

// //@description     Auth the user
// //@route           POST /api/users/login
// const authUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
  
//     const user = await User.findOne({ email });
  
//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         pic: user.pic,
//         acessToken: generateToken(user._id),
//       });
//     } else {
//       res.status(401);
//       throw new Error("Invalid Email or Password");
//     }
//   });

// export { registerUser, authUser };