/*
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Serve static files from the root directory
app.use(express.static(__dirname));

// Endpoint to fetch outfit items
app.get('/outfit-items', (req, res) => {
  const categories = ['shirts', 'accessories', 'pants', 'shoes'];
  const outfitItems = {};

  categories.forEach(category => {
    const dirPath = path.join(__dirname, 'images', category);
    outfitItems[category] = fs.readdirSync(dirPath).map(file => `images/${category}/${file}`);
  });

  res.json(outfitItems);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
*/