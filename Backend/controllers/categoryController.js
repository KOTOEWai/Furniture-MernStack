const Category = require("../models/categoryModel");
const { Msg } = require("../utils/core");

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) {
             Msg(res,"Categories not found",categories)
        }
     Msg( res,"Categories fetched successfully",categories)
    } catch (error) {
        res.status(500).json({ error: "Error fetching categories query" });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
       Msg(res,"Category fetched successfully",category)
    } catch (error) {
        res.status(500).json({ error: "Error fetching category" });
    }
};

const postCategory = async (req, res ) => {
    try {
        const { name, description , img } = req.body;
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: "Category name is required" });
        }
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: "Category with this name already exists" });
        }
        const newCategory = { name: name.trim(), description, img };
        const category = await Category.create(newCategory);
        Msg(res, "Category created successfully", category);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Error creating category", details: error.message });
    }

};

const dropCategory = async (req, res)=>{
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        Msg(res,"Category deleted successfully",category)
    } catch (error) {
        res.status(500).json({ error: "Error deleting category" });
    }
}

const patchCategory = async ( req,res)=>{
    try{
        const { name, description , parentCategory } = req.body;
     const updateCategory = { name, description , parentCategory };
        const category = await Category.findByIdAndUpdate(req.params.id, updateCategory, { new: true });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        Msg(res,"Category updated successfully",category)
    }catch(error){
        res.status(500).json({ error: "Error updating category" });
    }
}


module.exports = { getAllCategories , postCategory, getCategoryById ,dropCategory ,patchCategory };