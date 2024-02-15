const financeModel = require('../models/finance-model')

exports.financeInsert = (request, response) => {
    financeModel.financeInsert(request, response)
}

exports.financeSelect = (request, response) => {
    financeModel.financeSelect(request, response)
}

exports.financeUpdate = (request, response) => {
    financeModel.financeUpdate(request, response)
}