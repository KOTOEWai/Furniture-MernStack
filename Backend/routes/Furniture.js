const express = require("express");
const { getFurnitureData, getUniqueById, getUniqueCategories, getUniqueColors } = require("../utils/furnitureService");

const router = express.Router();


router.get("/furniture", async (req, res, next) => {
  try {
    const data = await getFurnitureData(req.query);
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

router.get("/furniture-categories", async (req, res, next) => {
  try {
    const categories = await getUniqueCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.get("/furniture-colors", async (req, res, next) => {
  try {
    const colors = await getUniqueColors();
    res.json(colors);
  } catch (err) {
    next(err);
  }
});

router.get("/furniture/data", async (req, res) => {
  try {
    const { title: name, product_type } = req.query;
    const response = await getFurnitureData();
    let filtered = response.data;


    // Search by title
    if (name) {
      const search = name.toLowerCase();
      filtered = filtered.filter(f =>
        f.title?.toLowerCase().includes(search)
      );
    }

    // Search by product_type
    if (product_type) {
      const searchTypes = String(product_type).split(",").map(t => t.toLowerCase().trim());
      filtered = filtered.filter(f => {
        const itemCats = f.categories_clean || [];
        return itemCats.some(cat => searchTypes.includes(cat.toLowerCase().trim()));
      });
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
