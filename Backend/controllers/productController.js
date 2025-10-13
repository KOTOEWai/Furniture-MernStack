
const { Msg ,ErrorMsg } = require("../utils/core");
const productModel = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
      const products = await productModel.find(req.body);
      if (!products) {
         ErrorMsg(res,"Products not found");
      }
      if (products.length === 0) {
        ErrorMsg(res,"No products found");
      } else {
        Msg(res,"Products fetched successfully",products)
      }
    } catch (err) {
      ErrorMsg(res,"Error fetching products",err)
  } }




const postProduct = async (req, res , next) => {
  console.log(req.body);  
  
  try {
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
      throw new Error("All fields are required");
    }
    const productExists = await productModel.findOne({ name });
    if (productExists) {
    next (new Error("Product already exists"));
    }
    const newProduct = await productModel.create({
      name,
      image,
      description,
      dimensions: JSON.parse(dimensions),
      category,
      price,
      discount_price,
      stock,
      tags: JSON.parse(tags),
    });

   Msg(res,"Product created successfully",newProduct)
  } catch (error) {
   next(new Error(error.message));
  }
};
module.exports = { getProducts , postProduct};