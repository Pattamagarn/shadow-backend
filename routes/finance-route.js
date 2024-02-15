const express = require('express')
const router = express.Router()
const { financeSelect, financeUpdate } = require('../controllers/finance-controller')

router.get('/finance-select', financeSelect)
router.patch('/finance-update', financeUpdate)

module.exports = router