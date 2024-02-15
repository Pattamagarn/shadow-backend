const express = require('express')
const router = express.Router()
const {createHistoryPayment, readHistoryPayment, updateHistoryPayment} = require('../models/history-payment-model')

router.post('/create-history-payment', createHistoryPayment)
router.get('/read-history-payment', readHistoryPayment)

module.exports = router