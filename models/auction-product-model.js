const connection = require('./connection')
const uuid = require('uuid')

module.exports.createAuctionProduct = (request, response) => {
    const requestUUID = uuid.v4()
    const requestName = request.body.name
    const requestGameName = request.body.game_name
    const requestDefaultPrice = request.body.default_price
    const requestDefaultBid = request.body.default_bid
    const requestStartTime = request.body.start_time
    const requestEndTime = request.body.end_time
    const requestInformation = request.body.information
    const requestDescription = request.body.description
    connection.query('INSERT INTO auction_product (uuid, name , game_name , default_price , default_bid, start_time, end_time , information , description, create_at) VALUE(?,?,?,?,?,?,?,?,?,?)',
        [requestUUID, requestName, requestGameName, requestDefaultPrice, requestDefaultBid, requestStartTime, requestEndTime, requestInformation, requestDescription,new Date()], (error, result) => {
            if (error) {
                response.status(200).json({ status: false, payload: '' })
            } else {
                response.status(200).json({ status: true, payload: 'สร้างสำเร็จ' })
            }
        })
}

module.exports.readAuctionProduct = (request, response) => {
    connection.query('SELECT game_name , name , default_price , auction_status , information , description FROM auction_product', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.updateAuctionProduct = (request, response) => {
    const requestUUID = request.body.uuid
    const requestName = request.body.name
    const requestGameName = request.body.game_name
    const requestDefaultPrice = request.body.default_price
    const requestDefaultBid = request.body.default_bid
    const requestStartTime = request.body.start_time
    const requestEndTime = request.body.end_time
    const requestInformation = request.body.information
    const requestDescription = request.body.description
    connection.query('UPDATE auction_product SET name = ? , game_name = ? , default_price = ? , default_bid = ?, start_time = ?, end_time = ? , information = ? , description = ? , update_at = ? WHERE uuid = ? LIMIT 1', 
        [requestName, requestGameName, requestDefaultPrice, requestDefaultBid, requestStartTime, requestEndTime, requestInformation, requestDescription,new Date(), requestUUID], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: '' })
        } else {
            response.status(200).json({ status: true, payload: 'แก้ไขสำเร็จ' })
        }
    })
}

module.exports.deleteAuctionProduct = (request, response) => {
    const requestUUID = request.body.uuid
    connection.query('DELETE FROM auction_product WHERE uuid = ?', [requestUUID], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: '' })
        } else {
            response.status(200).json({ status: true, payload: 'ลบสำเร็จ' })
        }
    })
}