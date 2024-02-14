const accountModel = require('../models/account-model')

exports.validationAccount = (request, response) => {
    accountModel.validationAccount(request, response)
}

exports.signUpAccount = (request, response) => {
    accountModel.signUpAccount(request, response)
}