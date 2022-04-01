import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

//Get Category
const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.find({category: req.category});
    res.json(category);
  });

//Create Category
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      res.status(400);
      throw new Error("Please Fill all the feilds");
      return;
    } else {
      const category = new Category({name});
  
      const createdCategory = await category.save();
  
      res.status(201).json(createdCategory);
    }
  });

//Delete Category
  const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
  
    // if (category.user.toString() !== req.category._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (category) {
      await category.remove();
      res.json({ message: "Removed success!!!" });
    } else {
      res.status(404);
      throw new Error("Note not Found");
    }
  });

export {getCategory, createCategory, deleteCategory}

