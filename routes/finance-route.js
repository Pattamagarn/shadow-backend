const express = require('express')
const router = express.Router()
const { financeInsert, financeSelect, financeUpdate } = require('../controllers/finance-controller')

router.post('/finance-insert', financeInsert)
router.get('/finance-select', financeSelect)
router.patch('/finance-update', financeUpdate)

module.exports = router