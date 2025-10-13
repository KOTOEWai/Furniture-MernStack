const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true , unique: true },
    image: { type: [String], required: true },
    description: { type: String, required: true },
    dimensions : {
    depth: { type: Number, required: true },
    width: { type: Number, required: true }, 
    height: { type: Number, required: true } },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true },
    discount_price: { type: Number },
    stock: { type: Number, required: true },
    tags: { type: [String]},
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;