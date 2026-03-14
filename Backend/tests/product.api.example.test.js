const express = require("express");
const request = require("supertest");

jest.mock("../models/productModel", () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
}));

const productModel = require("../models/productModel");
const { getProducts, postProduct } = require("../controllers/productController");
const errorHandler = require("../middleware/errorMiddleware");

const app = express();
app.use(express.json());
app.get("/api/products", getProducts);
app.post("/api/products/create", postProduct);
app.use(errorHandler);

describe("Product API with example data", () => {
  const exampleProduct = {
    name: "Modern Sofa Set",
    image: ["https://img.example.com/sofa-1.jpg"],
    description: "Comfortable 3-seater sofa with oak legs",
    dimensions: { depth: 90, width: 210, height: 88 },
    category: "507f1f77bcf86cd799439011",
    price: 799,
    discount_price: 699,
    stock: 12,
    tags: ["sofa", "living-room"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /api/products returns product list", async () => {
    productModel.find.mockResolvedValue([exampleProduct]);

    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(res.body.con).toBe(true);
    expect(Array.isArray(res.body.result)).toBe(true);
    expect(res.body.result[0].name).toBe("Modern Sofa Set");
  });

  it("POST /api/products/create creates product from example payload", async () => {
    productModel.findOne.mockResolvedValue(null);
    productModel.create.mockResolvedValue(exampleProduct);

    const res = await request(app)
      .post("/api/products/create")
      .send(exampleProduct);

    expect(res.statusCode).toBe(200);
    expect(res.body.con).toBe(true);
    expect(res.body.result.name).toBe("Modern Sofa Set");
    expect(productModel.create).toHaveBeenCalledWith(exampleProduct);
  });

  it("POST /api/products/create returns 400 if product already exists", async () => {
    productModel.findOne.mockResolvedValue(exampleProduct);

    const res = await request(app)
      .post("/api/products/create")
      .send(exampleProduct);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Product already exists");
  });
});
