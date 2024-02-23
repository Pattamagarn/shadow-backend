const express = require('express')
const router = express.Router()
const {createHistoryPayment, readHistoryPayment, updateHistoryPayment} = require('../controllers/history-payment-controller')

router.post('/create-history-payment', createHistoryPayment)
router.get('/read-history-payment', readHistoryPayment)

module.exports = router