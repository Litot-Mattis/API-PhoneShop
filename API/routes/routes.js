const express = require('express');
const router = express.Router();

// Require controller modules.
const productControllers = require('../controllers/productControllers')
const orderControllers = require('../controllers/orderControllers')

// Routes for products
router.get('/product/', productControllers.searchProductById)
router.get('/products/', productControllers.getAllProducts)

// Routes for Orders
router.get('/Orders/', orderControllers.getAllOrders)
router.post('/Orders/', orderControllers.CreateAnOrder)

module.exports = router;