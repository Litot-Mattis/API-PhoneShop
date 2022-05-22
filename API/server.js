require('dotenv').config()
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Phone Shop API',
            version: '1.0.0',
            description:
                'This is an API to manage a phone shop orders and products',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Mattis Litot',
                url: 'https://github.com/Litot-Mattis',
            },
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Development server',
            },
        ],
    },
    apis: ['./controllers/productControllers.js', './controllers/orderControllers.js'],
};

const openapiSpecification = swaggerJsdoc(options);
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 8080;
const productRoutes = require('./routes/routes')

// database connection
require('./config/database')

app.use(cors());
app.use(bodyParser.json({ extended: true }))

// routes
app.use('/api', productRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// server running status
app.listen(PORT, () => {
    console.log(`The app listening at http://localhost: ${PORT}`)
});