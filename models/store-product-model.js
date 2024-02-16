const connection = require('./connection')
const uuid = require('uuid')

module.exports.createStoreProduct = (request, response) => {
    const email = request.body.email
    const methodUUID = request.body.method_uuid
    const gameName = request.body.game_name
    const productName = request.body.product_name
    const usedStatus = request.body.used_status
    connection.query('INSERT INTO store_product (uuid, email , method_uuid , game_name , product_name, used_status, create_at) VALUE(?,?,?,?,?,?,?)',
        [uuid.v4(), email, methodUUID, gameName, productName, usedStatus, new Date()], (error, result) => {
            if (error) {
                response.status(200).json({ status: false, payload: '' })
            } else {
                response.status(200).json({ status: true, payload: 'สร้างสำเร็จ' })
            }
        })
}

module.exports.readStoreProduct = (request, response) => {
    const email = request.body.email
    connection.query('SELECT game_name , product_name , used_status , uuid FROM store_product WHERE email = ?', [email], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.updateStoreProduct = (request, response) => {
    const uuid = request.body.uuid
    const email = request.body.email
    const methodUUID = request.body.method_uuid
    const gameName = request.body.game_name
    const productName = request.body.product_name
    const usedStatus = request.body.used_status
    connection.query('UPDATE store_product SET uuid = ? , method_uuid = ? , game_name = ? , product_name = ? , used_status = ?, update_at = ? WHERE email = ? LIMIT 1', 
    [uuid, methodUUID, gameName, productName, usedStatus, new Date(), email], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: '' })
        } else {
            response.status(200).json({ status: true, payload: 'แก้ไขสำเร็จ' })
        }
    })
}