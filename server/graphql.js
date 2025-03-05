const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');

// Загружаем данные из JSON файла
const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'))).products;

// Определяем схему GraphQL
const schema = buildSchema(`
    type Product {
        id: ID
        name: String
        price: Int
        description: String
        categories: [String]
    }

    type Query {
        products: [Product]
        product(id: ID!): Product
        productNamesAndPrices: [ProductInfo]
    }

    type ProductInfo {
        name: String
        price: Int
    }
`);

// Определяем резолверы
const root = {
    products: () => productsData,
    product: ({ id }) => productsData.find(product => product.id === parseInt(id)),
    productNamesAndPrices: () => productsData.map(({ name, price }) => ({ name, price })),
};

// Создаем сервер
const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Включает графический интерфейс GraphiQL
}));

app.listen(4000, () => {
    console.log('GraphQL API is running on http://localhost:4000/graphql');
});