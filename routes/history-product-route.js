const express = require('express')
const router = express.Router()
const {createHistoryProduct, readHistoryProduct, updateHistoryProduct} = require('../models/history-product-model')

router.post('/create-history-product', createHistoryProduct)
router.get('/read-history-product', readHistoryProduct)

module.exports = router