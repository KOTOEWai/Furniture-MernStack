const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

corsOptions = {  origin: 'http://localhost:5173', 
  Credentials: true,
};
app.use(cors(corsOptions));
require("dotenv").config();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());


const { multipleFile  } = require("./utils/gallary");
const mongoConect = require("./config/db.config");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const categoryRoute = require("./routes/categoryRoute");
const furnitureRoute = require("./routes/Furniture");


if(!fs.existsSync(path.join(__dirname, "public", "uploads"))) {
  fs.mkdirSync(path.join(__dirname, "public", "uploads"));
}

app.use(express.static("public"));


app.post("/upload/multiple", multipleFile, (req,res,next)=>{
  res.json({con:true,msg:req.body.img})
});

app.use("/api/user",userRoute)
app.use("/api/products",productRoute)
app.use("/api/products/:sku",productRoute)
app.use("/api/categories",categoryRoute)
app.use("/api", furnitureRoute);





mongoConect().then(() => { console.log("Database connected successfully");
 app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT }`);
 })
})  ;





