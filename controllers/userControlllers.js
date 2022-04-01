import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//Get User
const getUser = asyncHandler(async (req, res) => {
    const user = await User.find({user: req.user});
    res.json(user);
});

//Create User
const registerUser = asyncHandler(async (req, res) => {
    const { email, passwordHash, firstName, lastName, credits, pictureId, picture, scope } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(404);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
        email,
        passwordHash,
        firstName,
        lastName,
        credits,
        pictureId,
        picture,
        scope
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        credits: user.credits,
        pictureId: user.pictureId,
        picture: user.picture,
        scope: user.scope,
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });

//Get User by Id
  const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  });

//Delete user
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    // if (note.user.toString() !== req.user._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (user) {
      await user.remove();
      res.json({ message: "Removed Success!!!" });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  });

//Update
const updateUser = asyncHandler(async (req, res) => {
    const { email, firstName, lastName, pictureId }  = req.body;
  
    const user = await User.findById(req.params.id);
  
    // if (note.user.toString() !== req.user._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (user) {
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.pictureId = pictureId;
  
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });
export {getUser, registerUser, getUserById, deleteUser, updateUser}