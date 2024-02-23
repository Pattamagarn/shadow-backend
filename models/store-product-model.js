const connection = require('./connection')
const uuid = require('uuid')
const jsonwebtoken = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports.createStoreProduct = (request, response) => {
    const requestUUID = uuid.v4()
    const token = request.cookies.token
    const decoded = jsonwebtoken.verify(token, SECRET)
    const requestEmail = decoded.email
    const requestMethodUUID = request.body.method_uuid
    const requestGameName = request.body.game_name
    const requestProductName = request.body.product_name
    const requestUsedStatus = request.body.used_status
    connection.query('INSERT INTO store_product (uuid, email , method_uuid , game_name , product_name, used_status, create_at) VALUE(?,?,?,?,?,?,?)',
        [requestUUID, requestEmail, requestMethodUUID, requestGameName, requestProductName, requestUsedStatus, new Date()], (error, result) => {
            if (error) {
                response.status(200).json({ status: false, payload: '' })
            } else {
                response.status(200).json({ status: true, payload: 'สร้างสำเร็จ' })
            }
        })
}

module.exports.readStoreProduct = (request, response) => {
    const token = request.cookies.token
    const decoded = jsonwebtoken.verify(token, SECRET)
    const requestEmail = decoded.email
    connection.query('SELECT game_name , product_name , used_status , uuid FROM store_product WHERE email = ?', [requestEmail], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.readTop10Product = (request, response) => {
    connection.query('SELECT game_name , product_name , COUNT(product_name) AS count FROM `store_product` WHERE timediff(now(), create_at) < "24:00:00" GROUP BY product_name', (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.updateStoreProduct = (request, response) => {
    const requestUUID = request.body.uuid
    const token = request.cookies.token
    const decoded = jsonwebtoken.verify(token, SECRET)
    const requestEmail = decoded.email
    const requestMethodUUID = request.body.method_uuid
    const requestGameName = request.body.game_name
    const requestProductName = request.body.product_name
    const requestUsedStatus = request.body.used_status
    connection.query('UPDATE store_product SET uuid = ? , method_uuid = ? , game_name = ? , product_name = ? , used_status = ?, update_at = ? WHERE email = ? LIMIT 1', 
    [requestUUID, requestMethodUUID, requestGameName, requestProductName, requestUsedStatus, new Date(), requestEmail], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: '' })
        } else {
            response.status(200).json({ status: true, payload: 'แก้ไขสำเร็จ' })
        }
    })
}