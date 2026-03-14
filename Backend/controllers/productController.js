
const { Msg } = require("../utils/core");
const productModel = require("../models/productModel");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/CustomError");

const getProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find(req.body);
  if (!products || products.length === 0) {
    throw new CustomError("No products found", 404);
  }
  Msg(res, "Products fetched successfully", products);
});

const postProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    dimensions,
    category,
    price,
    discount_price,
    stock,
    tags,
  } = req.body;

  if (!name || !image || !description || !dimensions || !category || !price || !stock) {
    throw new CustomError("All fields are required", 400);
  }
  

  const productExists = await productModel.findOne({ name });
  if (productExists) {
    throw new CustomError("Product already exists", 400);
  }

  const newProduct = await productModel.create({
    name,
    image,
    description,
    dimensions: typeof dimensions === 'string' ? JSON.parse(dimensions) : dimensions,
    category,
    price,
    discount_price,
    stock,
    tags: typeof tags === 'string' ? JSON.parse(tags) : tags,
  });

  Msg(res, "Product created successfully", newProduct);
});

module.exports = { getProducts, postProduct };