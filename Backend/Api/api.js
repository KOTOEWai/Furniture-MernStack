// app.js
const express = require('express');
const app = express();
const { getFurnitureData, getUniqueById } = require('../utils/furnitureService');

app.use(express.json());


app.get('/api/products', async (req, res) => {
  try {
    // Frontend ကပို့လိုက်တဲ့ query params တွေကို service ထဲကို ထည့်ပေးလိုက်ပါတယ်
    const result = await getFurnitureData(req.query);
    return res.json(result);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    return res.status(500).json({ error: 'Cannot fetch products' });
  }
});


app.get('/api/products/:sku', async (req, res) => {
  const sku = req.params.sku;
  try {
    const product = await getUniqueById(sku);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json(product);
  } catch (err) {
    console.error(`Error fetching product ${sku}:`, err.message);
    return res.status(500).json({ error: 'Cannot fetch product' });
  }
});
