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

const getFurnitureData = async () => {
  return new Promise((resolve, reject) => {
    let results = [];
    fs.createReadStream("data/furniture_dataset_cleaned_v2.csv")
      .pipe(csv())
      .on("data", (data) => {
        data.images = normalizePythonListString(data.images);
        data.categories_clean = normalizePythonListString(data.categories_clean);
        results.push(data);
      })
      .on("end", async () => {
        resolve(results);
      })
      .on("error", reject);
  });
};

const getUniqueById = async (id) => {
  const data = await getFurnitureData(); 
  const item = data.find(f => f.uniq_id === id); 
  return item || null; 
};

module.exports = { getFurnitureData  , getUniqueById };
