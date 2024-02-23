const connection = require('./connection')
const uuid = require('uuid')

module.exports.createGachaProduct = (request, response) => {
    const requestUUID = uuid.v4()
    const requestName = request.body.name
    const requestGameName = request.body.game_name
    const requestChance = request.body.chance
    const requestGuarantee = request.body.guarantee_status
    const requestInformation = request.body.information
    const requestDescription = request.body.description
    connection.query('INSERT INTO gacha_product (uuid, name , game_name , chance , guarantee_status , information , description, create_at) VALUE(?,?,?,?,?,?,?,?)',
        [requestUUID, requestName, requestGameName, requestChance, requestGuarantee, requestInformation, requestDescription,new Date()], (error, result) => {
            if (error) {
                response.status(200).json({ status: false, payload: '' })
            } else {
                response.status(200).json({ status: true, payload: 'สร้างสำเร็จ' })
            }
        })
}

module.exports.readGachaProduct = (request, response) => {
    connection.query('SELECT game_name , name , chance , information , description FROM gacha_product', [], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}

module.exports.updateGachaProduct = (request, response) => {
    const requestUUID = request.body.uuid
    const requestName = request.body.name
    const requestGameName = request.body.game_name
    const requestChance = request.body.chance
    const requestGuarantee = request.body.guarantee_status
    const requestInformation = request.body.information
    const requestDescription = request.body.description
    connection.query('UPDATE gacha_product SET name = ? , game_name = ? , chance = ? , guarantee_status = ? , information = ? , description = ? , update_at = ? WHERE uuid = ? LIMIT 1', 
        [requestName, requestGameName, requestChance, requestGuarantee, requestInformation, requestDescription, new Date(), requestUUID], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: '' })
        } else {
            response.status(200).json({ status: true, payload: 'แก้ไขสำเร็จ' })
        }
    })
}

module.exports.deleteGachaProduct = (request, response) => {
    const requestUUID = request.body.uuid
    connection.query('DELETE FROM gacha_product WHERE uuid = ?', [requestUUID], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: '' })
        } else {
            response.status(200).json({ status: true, payload: 'ลบสำเร็จ' })
        }
    })
}