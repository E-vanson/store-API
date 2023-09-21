const express = require('express')
const router = express.Router()

const {getAllProductsStatic, getAllProducts, createProduct, deleteProduct} = require('../controllers/products')

router.route('/').get(getAllProducts).post(createProduct)
router.route('/static').get(getAllProductsStatic)
router.route('/:id').delete(deleteProduct)

module.exports= router