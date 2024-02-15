const express = require('express')
const router = express.Router()
const {createAuctionProduct, readAuctionProduct, updateAuctionProduct, deleteAuctionProduct} = require('../models/auction-product-model')

router.post('/create-auction-product', createAuctionProduct)
router.get('/read-auction-product', readAuctionProduct)
router.patch('/update-auction-product', updateAuctionProduct)
router.delete('/delete-auction-product', deleteAuctionProduct)

module.exports = router