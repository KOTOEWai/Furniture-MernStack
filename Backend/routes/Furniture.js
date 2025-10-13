const express = require("express");
const { getFurnitureData ,getUniqueById } = require("../utils/furnitureService");

const router = express.Router();
const { verifyToken } = require("../utils/Auth");
router.get("/furniture", async (req, res, next) => {
  try {
    const data = await getFurnitureData();
    res.json(data);
  } catch (err) {
    next(err); 
  }
});

router.get("/furniture/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await getUniqueById(id);
    res.json(data);
  } catch (err) {
    next(err); 
  }
});

router.get("/furniture/data", async (req, res) => {
  try {
    const { title: name, product_type } = req.query;
    const data = await getFurnitureData();
  console.log(data);
    let filtered = data;


    // Search by title
    if (name) {
      const search = name.toLowerCase();
      filtered = filtered.filter(f =>
        f.title?.toLowerCase().includes(search)
      );
    }

    // Search by product_type
    if (product_type) {
      const search = product_type.toLowerCase().trim();
      filtered = filtered.filter(f =>
        f.product_type?.toLowerCase().trim() === search
      );
    }

    res.json({
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;
