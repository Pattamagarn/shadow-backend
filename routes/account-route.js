const express = require('express')
const router = express.Router()
const { validationAccount, signUpAccount } = require('../controllers/account-controller')


router.post('/sign-up-validation', validationAccount)
router.post('/sign-up-account', signUpAccount)

module.exports = router