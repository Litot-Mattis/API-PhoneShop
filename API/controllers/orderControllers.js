const { Orders } = require('../models/orderModel')
const { Products } = require('../models/productModel')

/**
* @openapi
* /api/orders:
*   get:
*     summary: Get all orders
*     description: Retrieve all orders from the database
*     responses:
*       200:
*         description: A successful response
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                  data:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       product_id:
*                         type: string
*                         description: The order ID.
*                         example: "0"
*                       product:
*                         type: string
*                         description: The product name.
*                         example: "iPhone X"
*                       brand:
*                         type: string
*                         description: The brand name.
*                         example: "Apple"
*                       price:
*                         type: string
*                         description: The price of the product.
*                         example: "999.99"
*                  number_of_items:
*                   type: number
*                   description: Number of items in the order
*                   example: 5
*                  time:
*                   type: string
*                   description: The time of the order
*                   example: "2022-05-20T14:28:29.165Z"
*/
exports.getAllOrders = (req, res) => {
    Orders.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            res.status(500).send(err)
        }
    })
}

/**
* @openapi
* /api/orders:
*   post:
*     summary: Create a new order
*     description: Create a new order by giving a list of products to order by name
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               products_to_order:
*                 type: array
*                 example: ["iPhone X", "iPhone X", "iPhone X"]

*     responses:
*       200:
*         description: A successful response
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                  _id:
*                   type: number
*                   description: Number of items in the order
*                   example: 4604805064
*                  data:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       product_id:
*                         type: string
*                         description: The order ID.
*                         example: "0"
*                       product:
*                         type: string
*                         description: The product name.
*                         example: "iPhone X"
*                       brand:
*                         type: string
*                         description: The brand name.
*                         example: "Apple"
*                       price:
*                         type: string
*                         description: The price of the product.
*                         example: "999.99"
*                  number_of_items:
*                   type: number
*                   description: Number of items in the order
*                   example: 5
*                  time:
*                   type: string
*                   description: The time of the order
*                   example: "2022-05-20T14:28:29.165Z"
*/
exports.CreateAnOrder = (req, res) => {
    const orders = req.body?.products_to_order || null
    const orderList = new Orders()

    if (orders === null || orders === '' || orders.length === 0) {
        return res.status(400).send('Please fill all the fields')
    }

    const ordersClean = []
    for (let order in orders) {
        ordersClean.push(String(orders[order]).toLowerCase().trim())
    }

    (async () => {
        const products_input = await ordersPrepare(ordersClean)
        for (let product in products_input) {
            if (products_input[product].length === 0 || products_input[product] === null || products_input[product] === []) {
                return res.status(400).send('One of the product you declared is not in the database')
            }
            orderList.products.push({
                product_id: products_input[product][0]._id,
                product: products_input[product][0].product,
                brand: products_input[product][0].brand,
                price: products_input[product][0].price
            })
        }
        orderList.number_of_items = ordersClean.length

        orderList.save((err, docs) => {
            if (!err) {
                res.status(201).send(docs)
            } else {
                console.log('err', err)
                res.status(500).send(err)
            }
        })
    })()
}

/**
 *
 * @param {Orders} orders - list of products to order
 * @returns {Promise<Array>} - list of products to order
 */
const ordersPrepare = async (orders) => {
    const result = []
    for (let order in orders) {
        result.push(await getProductsDB(orders[order]))
    }
    return result
}

/**
 * 
 * @param {Orders} order - product to order
 * @returns {Promise<Array>} - product to order
 */
const getProductsDB = async (order) => {
    const product = await Products.find({ product: order })
    return product
}