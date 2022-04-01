import asyncHandler from "express-async-handler";
import Category from "../models/category.model.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";

//Get Category
const getCategory = asyncHandler(async (req, res) => {
  let categories = await Category.find();
  res.json(categories);
});

//Create Category
const createCategory = asyncHandler(async (req, res) => {
  let { name } = req.body;

  if (!name) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập tên danh mục' });
  }

  let category = new Category({ name });

  category = await category.save();

  return res.status(httpStatusCodes.OK).json(category);
});

//Update Category
const updateCategory = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let { name } = req.body;

  if (!name) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập tên danh mục' });
  }
  let category = await Category.findById(id);
  if (!category) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Danh mục không tồn tại' });
  }

  category.name = name;
  category = await category.save()
  return res.status(httpStatusCodes.OK).json(category);
});

//Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let category = await Category.findById(id);

  if (!category) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Danh mục không tồn tại' });
  }
  return res.status(httpStatusCodes.OK).json({status: 'success'});
});

export { getCategory, createCategory, deleteCategory, updateCategory }

