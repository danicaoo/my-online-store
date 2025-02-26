const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const productsFilePath = path.join(__dirname, '../data/products.json');

// Добавьте следующий маршрут для корневого URL
app.get('/', (req, res) => {
    res.send('Admin Server is up and running!');
});

app.post('/admin/products', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath));
    products.products.push(req.body);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.status(201).json(req.body);
});

app.put('/admin/products/:id', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath));
    const productId = parseInt(req.params.id);
    const productIndex = products.products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
        products.products[productIndex] = { ...products.products[productIndex], ...req.body };
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.json(products.products[productIndex]);
    } else {
        res.status(404).send('Товар не найден');
    }
});

app.delete('/admin/products/:id', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath));
    const productId = parseInt(req.params.id);
    const productIndex = products.products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
        products.products.splice(productIndex, 1);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.sendStatus(204);
    } else {
        res.status(404).send('Товар не найден');
    }
});

app.listen(PORT, () => {
    console.log(`Admin server is running on http://localhost:${PORT}`);
});