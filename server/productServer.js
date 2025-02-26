const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Добавьте обработчик для корневого URL
app.get('/', (req, res) => {
    res.send('Product Server is up and running!');
});

// Обработчик GET-запроса для получения продуктов
app.get('/products', (req, res) => {
    const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json')));
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Product server is running on http://localhost:${PORT}`);
});