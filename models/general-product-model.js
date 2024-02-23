const connection = require('./connection')
const uuid = require('uuid')

module.exports.createGeneralProduct = (request, response) => {
    const requestUUID = uuid.v4()
    const requestName = request.body.name
    const requestGameName = request.body.game_name
    const requestNormalPrice = request.body.normal_price
    const requestSpecialPrice = request.body.special_price
    const requestInformation = request.body.information
    const requestDescription = request.body.description
    connection.query('INSERT INTO general_product (uuid, name , game_name , normal_price , special_price , information , description, create_at) VALUE(?,?,?,?,?,?,?,?)',
        [requestUUID, requestName, requestGameName, requestNormalPrice, requestSpecialPrice, requestInformation, requestDescription,new Date()], (error, result) => {
            if (error) {
                response.status(200).json({ status: false, payload: '' })
            } else {
                response.status(200).json({ status: true, payload: 'สร้างสำเร็จ' })
            }
        })
}

module.exports.readGeneralProduct = (request, response) => {
    connection.query('SELECT name , game_name , normal_price , special_price , special_price_status , information , description FROM general_product', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.updateGeneralProduct = (request, response) => {
    const requestUUID = request.body.uuid
    const requestName = request.body.name
    const requestGameName = request.body.game_name
    const requestNormalPrice = request.body.normal_price
    const requestSpecialPrice = request.body.special_price
    const requestInformation = request.body.information
    const requestDescription = request.body.description
    connection.query('UPDATE general_product SET name = ? , game_name = ? , normal_price = ? , special_price = ? , information = ? , description = ? , update_at = ? WHERE uuid = ? LIMIT 1', 
        [requestName, requestGameName, requestNormalPrice, requestSpecialPrice, requestInformation, requestDescription, new Date(), requestUUID], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: '' })
        } else {
            response.status(200).json({ status: true, payload: 'แก้ไขสำเร็จ' })
        }
    })
}

module.exports.deleteGeneralProduct = (request, response) => {
    const requestUUID = request.body.uuid
    connection.query('DELETE FROM general_product WHERE uuid = ?', [requestUUID], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: '' })
        } else {
            response.status(200).json({ status: true, payload: 'ลบสำเร็จ' })
        }
    })
}
