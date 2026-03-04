const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
//const csv = require("csv-parser");


const helmet = require("helmet");

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',  // dynamic URL
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));

require("dotenv").config();
// ... rest of middleware ...
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cookieParser());

const { multipleFile } = require("./utils/gallary");
const mongoConect = require("./config/db.config");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const categoryRoute = require("./routes/categoryRoute");
const furnitureRoute = require("./routes/Furniture");

if (!fs.existsSync(path.join(__dirname, "public", "uploads"))) {
  fs.mkdirSync(path.join(__dirname, "public", "uploads"));
}

app.use(express.static("public"));

// Upload Routes
app.post("/upload/multiple", multipleFile, (req, res, next) => {
  res.json({ con: true, msg: req.body.img })
});

// Routes
app.use("/api/user", userRoute)
app.use("/api/products", productRoute)
app.use("/api/products/:sku", productRoute)
app.use("/api/categories", categoryRoute)
app.use("/api", furnitureRoute);

// Error Handler
const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler); // Place before starting server but outside the then block for better coverage

// Database Connection
if (process.env.NODE_ENV !== 'test') {
  mongoConect().then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  }).catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
}

module.exports = app;





