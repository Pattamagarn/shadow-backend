const express = require('express')
const router = express.Router()
const {createStoreProduct, readStoreProduct, updateStoreProduct} = require('../models/store-product-model')

router.post('/create-store-product', createStoreProduct)
router.get('/read-store-product', readStoreProduct)
router.patch('/update-store-product', updateStoreProduct)

module.exports = router