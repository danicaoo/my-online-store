const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const productsFilePath = path.join(__dirname, '../data/products.json');

// Проверка существования файла и начальная инициализация
function readProducts() {
    if (!fs.existsSync(productsFilePath)) {
        // Если файла нет, создаем его с пустым массивом
        fs.writeFileSync(productsFilePath, JSON.stringify({ products: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(productsFilePath));
}

function writeProducts(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

// Корневой маршрут
app.get('/', (req, res) => {
    res.send('Admin Server is up and running!');
});

// Добавить новый товар
app.post('/admin/products', (req, res) => {
    const products = readProducts();
    const newProductId = products.products.length ? products.products[products.products.length - 1].id + 1 : 1; // Генерация уникального ID
    const newProduct = { id: newProductId, ...req.body }; // Создаем новый продукт с новым ID
    products.products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
});

// Обновить товар по ID
app.put('/admin/products/:id', (req, res) => {
    const products = readProducts();
    const productId = parseInt(req.params.id);
    const productIndex = products.products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
        products.products[productIndex] = { ...products.products[productIndex], ...req.body };
        writeProducts(products);
        res.json(products.products[productIndex]);
    } else {
        res.status(404).send('Товар не найден');
    }
});

// Удалить товар по ID
app.delete('/admin/products/:id', (req, res) => {
    const products = readProducts();
    const productId = parseInt(req.params.id);
    const productIndex = products.products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
        products.products.splice(productIndex, 1);
        writeProducts(products);
        res.sendStatus(204);
    } else {
        res.status(404).send('Товар не найден');
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Admin server is running on http://localhost:${PORT}`);
});