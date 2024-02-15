const connection = require('./connection')
const uuid = require('uuid')

module.exports.createHistoryProduct = (request, response) => {
    const email = request.body.email
    const gameName = request.body.game_name
    const productName = request.body.product_name
    const productPrice = request.body.product_price
    const buyMethod = request.body.buy_method
    connection.query('INSERT INTO history_product (uuid, email , game_name , product_name, product_price, buy_method, create_at) VALUE(?,?,?,?,?,?,?)',
        [uuid.v4(), email, gameName, productName, productPrice, buyMethod, Date.now()], (error, result) => {
            if (error) {
                response.status(200).json({ status: false, payload: '' })
            } else {
                response.status(200).json({ status: true, payload: 'สร้างสำเร็จ' })
            }
        })
}

module.exports.readHistoryProduct = (request, response) => {
    const email = request.body.email
    connection.query('SELECT game_name , product_name , product_price , buy_method, create_at FROM history_product WHERE email = ?', [email], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}