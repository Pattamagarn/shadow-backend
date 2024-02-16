const accountModel = require('../models/account-model')

exports.accountSelect = (request, response) => {
    accountModel.accountSelect(request, response)
}

exports.validationAccount = (request, response) => {
    accountModel.validationAccount(request, response)
}

exports.signUpAccount = (request, response) => {
    accountModel.signUpAccount(request, response)
}

exports.signInAccount = (request, response) => {
    accountModel.signInAccount(request, response)
}

exports.authenticationAccount = (request, response) => {
    accountModel.authenticationAccount(request, response)
}

exports.editAccount = (request, response) => {
    accountModel.editAccount(request, response)
}