// app.js
const express = require('express');
const axios = require('axios');
const app = express();
const FURNITURE_API_BASE = 'https://furniture-api.fly.dev/v1';

app.use(express.json());


app.get('/api/products', async (req, res) => {
  try {
    const resp = await axios.get(`${FURNITURE_API_BASE}/products`, {
      params: req.query  // pass query params if needed (page, filters)
    });
    return res.json(resp.data);
  } catch (err) {
    console.error('Error fetching products:', err.response?.data || err.message);
    return res.status(500).json({ error: 'Cannot fetch products' });
  }
});


app.get('/api/products/:sku', async (req, res) => {
  const sku = req.params.sku;
  try {
    const resp = await axios.get(`${FURNITURE_API_BASE}/products/${sku}`);
    return res.json(resp.data);
  } catch (err) {
    return res.status(404).json({ error: 'Product not found' });
  }
});

app.patch('/api/products/stock', async (req, res) => {
    const { sku, quantity } = req.body; 
    if (!sku || typeof quantity !== 'number') {
      return res.status(400).json({ error: 'SKU and quantity are required' });
    }
    try {
      const resp = await axios.patch(`${FURNITURE_API_BASE}/products/stock`, { sku, quantity });
      return res.json(resp.data);
    } catch (err) {
      console.error('Error updating stock:', err.response?.data || err.message);
      return res.status(500).json({ error: 'Cannot update stock' });
    }   });


 
