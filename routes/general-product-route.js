const express = require('express')
const router = express.Router()
const {createGeneralProduct, readGeneralProduct, updateGeneralProduct, deleteGeneralProduct} = require('../models/general-product-model')

router.post('/create-general-product', createGeneralProduct)
router.get('/read-general-product', readGeneralProduct)
router.patch('/update-general-product', updateGeneralProduct)
router.delete('/delete-general-product', deleteGeneralProduct)

module.exports = router