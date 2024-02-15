const paymentMethodModel = require('../models/payment-method-model')

exports.paymentMethodInsert = (request, response) => {
    paymentMethodModel.paymentMethodInsert(request, response)
}

exports.paymentMethodSelect = (request, response) => {
    paymentMethodModel.paymentMethodSelect(request, response)
}

exports.paymentMethodUpdate = (request, response) => {
    paymentMethodModel.paymentMethodUpdate(request, response)
}