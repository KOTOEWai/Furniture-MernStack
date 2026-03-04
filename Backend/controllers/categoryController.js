const Category = require("../models/categoryModel");
const { Msg } = require("../utils/core");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/CustomError");

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    Msg(res, "Categories fetched successfully", categories);
});

const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        throw new CustomError("Category not found", 404);
    }
    Msg(res, "Category fetched successfully", category);
});

const postCategory = asyncHandler(async (req, res) => {
    const { name, description, img } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new CustomError("Category name is required", 400);
    }

    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
        throw new CustomError("Category with this name already exists", 400);
    }

    const category = await Category.create({ name: name.trim(), description, img });
    Msg(res, "Category created successfully", category);
});

const dropCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
        throw new CustomError("Category not found", 404);
    }
    Msg(res, "Category deleted successfully", category);
});

const patchCategory = asyncHandler(async (req, res) => {
    const { name, description, parentCategory } = req.body;
    const category = await Category.findByIdAndUpdate(req.params.id, { name, description, parentCategory }, { new: true });
    if (!category) {
        throw new CustomError("Category not found", 404);
    }
    Msg(res, "Category updated successfully", category);
});

module.exports = { getAllCategories, postCategory, getCategoryById, dropCategory, patchCategory };
