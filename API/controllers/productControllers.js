const { Products } = require('../models/productModel')
const ObjectID = require('mongoose').Types.ObjectId

/**
* @openapi
* /api/products:
*   get:
*     summary: Get all products
*     description: Retrieve all products from the database as a list
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
*                       _id:
*                         type: string
*                         description: The product ID.
*                         example: "62874e7e0ce136cdf44ca63b"
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
*                       time:
*                        type: string
*                        description: The time of the order
*                        example: "2022-05-20T14:28:29.165Z"
*/
exports.getAllProducts = (req, res) => {
    Products.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            res.status(500).send(err)
        }
    })
}


/**
* @openapi
* /api/products/{id}:
*   get:
*     summary: Get a product by ID
*     description: Retrieve a product by ID
*     parameters:
*       - name: id
*         in: path
*         description: The product ID.
*         required: true
*         schema:
*           type: string
*           format: string
*           example: "62874e7e0ce136cdf44ca63b"
*     responses:
*       200:
*         description: A successful response
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                   _id:
*                     type: string
*                     description: The product ID.
*                     example: "62874e7e0ce136cdf44ca63b"
*                   product:
*                     type: string
*                     description: The product name.
*                     example: "iPhone X"
*                   brand:
*                     type: string
*                     description: The brand name.
*                     example: "Apple"
*                   price:
*                     type: string
*                     description: The price of the product.
*                     example: "999.99"
*                   time:
*                    type: string
*                    description: The time of the order
*                    example: "2022-05-20T14:28:29.165Z"
*/
exports.searchProductById = (req, res) => {
    const id = req.query.id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Products.findById(id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            res.status(500).send(err)
        }
    })
}