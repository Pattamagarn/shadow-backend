const connection = require('./connection')
const uuid = require('uuid')
const jsonwebtoken = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports.createHistoryProduct = (request, response) => {
    const requestUUID = uuid.v4()
    const token = request.cookies.token
    const decoded = jsonwebtoken.verify(token, SECRET)
    const requestEmail = decoded.email
    const requestGameName = request.body.game_name
    const requestProductName = request.body.product_name
    const requestProductPrice = request.body.product_price
    const requestBuyMethod = request.body.buy_method
    connection.query('INSERT INTO history_product (uuid, email , game_name , product_name, product_price, buy_method, create_at) VALUE(?,?,?,?,?,?,?)',
        [requestUUID, requestEmail, requestGameName, requestProductName, requestProductPrice, requestBuyMethod, new Date()], (error, result) => {
            if (error) {
                response.status(200).json({ status: false, payload: '' })
            } else {
                response.status(200).json({ status: true, payload: 'สร้างสำเร็จ' })
            }
        })
}

module.exports.readHistoryProduct = (request, response) => {
    const token = request.cookies.token
    const decoded = jsonwebtoken.verify(token, SECRET)
    const requestEmail = decoded.email
    // console.log(email)
    connection.query('SELECT game_name , product_name , product_price , buy_method, create_at FROM history_product WHERE email = ?', [requestEmail], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}