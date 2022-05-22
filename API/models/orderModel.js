const mongoose = require('mongoose')

// Define a schema for the order model
const Orders = mongoose.model('Orders', {
    products: [{
        product_id: String,
        product: String,
        brand: String,
        price: String,
    }],
    time: {
        type: Date,
        default: Date.now,
    },
    number_of_items: Number,
})

module.exports = { Orders }