const fs = require("fs");
const csv = require("csv-parser");


const getFurnitureData = async () => {
  return new Promise((resolve, reject) => {
    let results = [];
    fs.createReadStream("data/furniture_dataset_cleaned.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
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
