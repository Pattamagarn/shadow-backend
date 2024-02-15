const financeModel = require('../models/finance-model')

exports.financeSelect = (request, response) => {
    financeModel.financeSelect(request, response)
}

exports.financeUpdate = (request, response) => {
    financeModel.financeUpdate(request, response)
}