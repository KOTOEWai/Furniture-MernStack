const fs = require("fs");
const csv = require("csv-parser");

const normalizePythonListString = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean).map((v) => String(v).trim()).filter(Boolean);
  if (typeof value !== "string") return [];

  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === "nan" || trimmed.toLowerCase() === "none") return [];

  // Expected CSV format: "['url1 ', ' url2', ...]"
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];

    return inner
      .split(",")
      .map((part) => part.trim())
      .map((part) => part.replace(/^['"]/, "").replace(/['"]$/, "").trim())
      .filter(Boolean);
  }

  // Fallback: treat as single value
  return [trimmed];
};

let allFurnitureData = [];

const loadData = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream("data/furniture_dataset_cleaned_v2.csv")
      .pipe(csv())
      .on("data", (data) => {
        data.images = normalizePythonListString(data.images);
        data.categories_clean = normalizePythonListString(data.categories_clean);
        results.push(data);
      })
      .on("end", () => {
        allFurnitureData = results;
        console.log(`✅ Loaded ${allFurnitureData.length} furniture items from CSV.`);
        resolve();
      })
      .on("error", reject);
  });
};

// Server စတက်ချိန်မှာ data ကို တစ်ခါပဲ ကြိုတင် load လုပ်ထားပါမယ်။
loadData().catch(err => console.error("❌ Failed to load furniture data:", err));

const getFurnitureData = async (queryParams = {}) => {
  const { page = 1, limit = 12, product_type, minPrice, maxPrice, color } = queryParams;

  let filteredData = [...allFurnitureData];

  // Server-side filtering
  if (product_type) {
    const searchTypes = String(product_type).split(",").map(t => t.toLowerCase().trim());
    filteredData = filteredData.filter(item => {
      const lowerProductType = String(item.product_type || "").toLowerCase();
      const inProductType = searchTypes.some(st => lowerProductType.includes(st));

      const inCategories = item.categories_clean.some(cat => {
        const lowerCat = cat.toLowerCase().trim();
        return searchTypes.some(st => lowerCat.includes(st));
      });

      return inProductType || inCategories;
    });
  }
  if (minPrice) {
    filteredData = filteredData.filter(item => parseFloat(item.price_clean) >= parseFloat(minPrice));
  }
  if (maxPrice) {
    filteredData = filteredData.filter(item => parseFloat(item.price_clean) <= parseFloat(maxPrice));
  }
  if (color) {
    const searchColors = String(color).split(",").map(c => c.toLowerCase().trim());
    filteredData = filteredData.filter(item => {
      const itemColor = String(item.color_clean || "").toLowerCase();
      return searchColors.some(sc => itemColor.includes(sc));
    });
  }

  // Server-side pagination
  const startIndex = (Number(page) - 1) * Number(limit);
  const paginatedData = filteredData.slice(startIndex, startIndex + Number(limit));

  return {
    data: paginatedData,
    currentPage: Number(page),
    totalPages: Math.ceil(filteredData.length / Number(limit)),
    totalItems: filteredData.length,
  };
};

const getUniqueById = async (id) => {
  const item = allFurnitureData.find(f => f.uniq_id === id);
  return item || null;
};

const getUniqueCategories = async () => {
  const categoryCounts = {};
  allFurnitureData.forEach(item => {
    // Add from categories_clean
    item.categories_clean.forEach(cat => {
      const trimmed = cat.trim();
      if (trimmed) {
        categoryCounts[trimmed] = (categoryCounts[trimmed] || 0) + 1;
      }
    });
    // Add from product_type column
    if (item.product_type) {
        const trimmedType = item.product_type.trim();
        if (trimmedType) {
            categoryCounts[trimmedType] = (categoryCounts[trimmedType] || 0) + 1;
        }
    }
  });

  return Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
};

const getUniqueColors = async () => {
  const colorCounts = {};
  allFurnitureData.forEach(item => {
    if (item.color_clean) {
      const trimmed = item.color_clean.trim();
      if (trimmed) {
        colorCounts[trimmed] = (colorCounts[trimmed] || 0) + 1;
      }
    }
  });

  return Object.entries(colorCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
};

module.exports = { getFurnitureData, getUniqueById, getUniqueCategories, getUniqueColors };
