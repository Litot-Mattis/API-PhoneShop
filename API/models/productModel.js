const mongoose = require('mongoose')

// Define a schema for the Product model
const Products = mongoose.model('Products', {
    product: String,
    brand: String,
    price: String,
    time: {
        type: Date,
        default: Date.now,
    },
})

module.exports = { Products }