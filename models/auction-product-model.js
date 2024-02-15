const connection = require('./connection')
const uuid = require('uuid')

module.exports.createAuctionProduct = (request, response) => {
    const name = request.body.name
    const gameName = request.body.game_name
    const defaultPrice = request.body.default_price
    const defaultBid = request.body.default_bid
    const startTime = request.body.start_time
    const endTime = request.body.end_time
    const information = request.body.information
    const description = request.body.description
    connection.query('INSERT INTO auction_product (uuid, name , game_name , default_price , default_bid, start_time, end_time , information , description, create_at) VALUE(?,?,?,?,?,?,?,?,?,?)',
        [uuid.v4(), name, gameName, defaultPrice, defaultBid, startTime, endTime, information, description,Date.now()], (error, result) => {
            if (error) {
                response.status(200).json({ status: false, payload: '' })
            } else {
                response.status(200).json({ status: true, payload: 'สร้างสำเร็จ' })
            }
        })
}

module.exports.readAuctionProduct = (request, response) => {
    connection.query('SELECT game_name , name , default_price , auction_status FROM auction_product', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.updateAuctionProduct = (request, response) => {
    const uuid = request.body.uuid
    const name = request.body.name
    const gameName = request.body.game_name
    const defaultPrice = request.body.default_price
    const defaultBid = request.body.default_bid
    const startTime = request.body.start_time
    const endTime = request.body.end_time
    const information = request.body.information
    const description = request.body.description
    connection.query('UPDATE auction_product SET name = ? , game_name = ? , default_price = ? , default_bid = ?, start_time = ?, end_time = ? , information = ? , description = ? , update_at = ? WHERE uuid = ? LIMIT 1', [name, gameName, defaultPrice, defaultBid, startTime, endTime, information, description, Date.now(), uuid], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: '' })
        } else {
            response.status(200).json({ status: true, payload: 'แก้ไขสำเร็จ' })
        }
    })
}

module.exports.deleteAuctionProduct = (request, response) => {
    const uuid = request.body.uuid
    connection.query('DELETE FROM auction_product WHERE uuid = ?', [uuid], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: '' })
        } else {
            response.status(200).json({ status: true, payload: 'ลบสำเร็จ' })
        }
    })
}