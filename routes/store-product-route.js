const express = require('express')
const router = express.Router()
const {createStoreProduct, readStoreProduct, readTop10Product, updateStoreProduct} = require('../controllers/store-product-controller')

router.post('/create-store-product', createStoreProduct)
router.get('/read-store-product', readStoreProduct)
router.get('/read-top10-product', readTop10Product)
router.patch('/update-store-product', updateStoreProduct)

module.exports = router