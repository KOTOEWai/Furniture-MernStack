const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

dotenv.config();

const categories = [
  {
    name: "Living Room",
    img: "https://images.unsplash.com/photo-1493666438817-866a91353ca9",
    description: "Sofas, tables, and decor for living spaces.",
  },
  {
    name: "Bedroom",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    description: "Beds, wardrobes, and nightstands for bedrooms.",
  },
  {
    name: "Dining",
    img: "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
    description: "Dining tables and chairs for family meals.",
  },
];

const products = [
  {
    name: "Modern Sofa Set",
    image: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc"],
    description: "Comfortable 3-seater sofa with oak legs.",
    dimensions: { depth: 90, width: 210, height: 88 },
    categoryName: "Living Room",
    price: 799,
    discount_price: 699,
    stock: 12,
    tags: ["sofa", "living-room", "modern"],
  },
  {
    name: "Oak Coffee Table",
    image: ["https://images.unsplash.com/photo-1532375810709-75b1da00537c"],
    description: "Solid oak rectangular coffee table.",
    dimensions: { depth: 60, width: 120, height: 45 },
    categoryName: "Living Room",
    price: 249,
    discount_price: 219,
    stock: 20,
    tags: ["table", "oak", "living-room"],
  },
  {
    name: "Queen Platform Bed",
    image: ["https://images.unsplash.com/photo-1505693314120-0d443867891c"],
    description: "Minimal platform bed frame in walnut finish.",
    dimensions: { depth: 210, width: 165, height: 100 },
    categoryName: "Bedroom",
    price: 899,
    discount_price: 829,
    stock: 8,
    tags: ["bed", "bedroom", "walnut"],
  },
  {
    name: "Nightstand Pair",
    image: ["https://images.unsplash.com/photo-1616594039964-3f94d90f3d6f"],
    description: "Set of two nightstands with soft-close drawers.",
    dimensions: { depth: 42, width: 55, height: 58 },
    categoryName: "Bedroom",
    price: 299,
    discount_price: 269,
    stock: 15,
    tags: ["nightstand", "bedroom"],
  },
  {
    name: "6-Seater Dining Table",
    image: ["https://images.unsplash.com/photo-1577140917170-285929fb55b7"],
    description: "Large wooden dining table for six people.",
    dimensions: { depth: 95, width: 180, height: 75 },
    categoryName: "Dining",
    price: 1099,
    discount_price: 999,
    stock: 6,
    tags: ["dining", "table", "wood"],
  },
  {
    name: "Upholstered Dining Chair",
    image: ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf"],
    description: "Fabric dining chair with ergonomic back support.",
    dimensions: { depth: 55, width: 48, height: 95 },
    categoryName: "Dining",
    price: 149,
    discount_price: 129,
    stock: 40,
    tags: ["dining", "chair", "fabric"],
  },
];

async function seed() {
  const mongoUri = process.env.Mongo_api;
  if (!mongoUri) {
    throw new Error("Mongo_api is missing in .env");
  }

  await mongoose.connect(mongoUri);

  const categoryIdByName = {};
  let categoriesCreated = 0;
  let categoriesUpdated = 0;

  for (const category of categories) {
    const existing = await Category.findOne({ name: category.name });
    if (existing) {
      existing.img = category.img;
      existing.description = category.description;
      await existing.save();
      categoryIdByName[category.name] = existing._id;
      categoriesUpdated += 1;
    } else {
      const created = await Category.create(category);
      categoryIdByName[category.name] = created._id;
      categoriesCreated += 1;
    }
  }

  let productsCreated = 0;
  let productsUpdated = 0;

  for (const item of products) {
    const payload = {
      name: item.name,
      image: item.image,
      description: item.description,
      dimensions: item.dimensions,
      category: categoryIdByName[item.categoryName],
      price: item.price,
      discount_price: item.discount_price,
      stock: item.stock,
      tags: item.tags,
    };

    const result = await Product.updateOne(
      { name: payload.name },
      { $set: payload },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      productsCreated += 1;
    } else if (result.modifiedCount > 0) {
      productsUpdated += 1;
    }
  }

  console.log("Seed complete");
  console.log({
    categoriesCreated,
    categoriesUpdated,
    productsCreated,
    productsUpdated,
  });

  await mongoose.disconnect();
}

seed().catch(async (err) => {
  console.error("Seed failed:", err.message);
  await mongoose.disconnect();
  process.exit(1);
});
