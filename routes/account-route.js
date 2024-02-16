const express = require('express')
const router = express.Router()
const { accountSelect, validationAccount, signUpAccount, signInAccount, authenticationAccount, editAccount } = require('../controllers/account-controller')

router.get('/account-select', accountSelect)
router.post('/sign-up-validation', validationAccount)
router.post('/sign-up-account', signUpAccount)
router.post('/sign-in-account', signInAccount)
router.get('/authentication-account', authenticationAccount)
router.patch('/edit-account', editAccount)

module.exports = router