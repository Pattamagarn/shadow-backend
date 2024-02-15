const historyPaymentModel = require('../models/history-payment-model')

exports.createHistoryPayment = (request, response) => {
    historyPaymentModel.createHistoryPayment(request, response)
}

exports.readHistoryPayment = (request, response) => {
    historyPaymentModel.readHistoryPayment(request, response)
}