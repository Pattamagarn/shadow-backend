const { request, response } = require('express')
const storeProductModel = require('../models/store-product-model')

exports.createStoreProduct = (request, response) => {
    storeProductModel.createStoreProduct(request, response)
}

exports.readStoreProduct = (request, response) => {
    storeProductModel.readStoreProduct(request, response)
}

exports.readTop10Product = (request, response) => {
    storeProductModel.readTop10Product(request, response)
}

exports.updateStoreProduct = (request, response) => {
    storeProductModel.updateStoreProduct(request, response)
}