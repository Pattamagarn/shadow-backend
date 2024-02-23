const express = require('express')
const router = express.Router()
const {createHistoryProduct, readHistoryProduct, updateHistoryProduct} = require('../controllers/history-product-controller')

router.post('/create-history-product', createHistoryProduct)
router.get('/read-history-product', readHistoryProduct)

module.exports = router