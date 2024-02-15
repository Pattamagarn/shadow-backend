const connection = require('./connection')
const uuid = require('uuid')

module.exports.createGachaProduct = (request, response) => {
    const name = request.body.name
    const gameName = request.body.game_name
    const chance = request.body.chance
    const guarantee = request.body.guarantee_status
    const information = request.body.information
    const description = request.body.description
    connection.query('INSERT INTO gacha_product (uuid, name , game_name , chance , guarantee_status , information , description, create_at) VALUE(?,?,?,?,?,?,?,?)',
        [uuid.v4(), name, gameName, chance, guarantee, information, description,Date.now()], (error, result) => {
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
    const uuid = request.body.uuid
    const name = request.body.name
    const gameName = request.body.game_name
    const chance = request.body.chance
    const guarantee = request.body.guarantee_status
    const information = request.body.information
    const description = request.body.description
    connection.query('UPDATE gacha_product SET name = ? , game_name = ? , chance = ? , guarantee_status = ? , information = ? , description = ? , update_at = ? WHERE uuid = ? LIMIT 1', [name, gameName, chance, guarantee, information, description, Date.now(), uuid], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: '' })
        } else {
            response.status(200).json({ status: true, payload: 'แก้ไขสำเร็จ' })
        }
    })
}

module.exports.deleteGachaProduct = (request, response) => {
    const uuid = request.body.uuid
    connection.query('DELETE FROM gacha_product WHERE uuid = ?', [uuid], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: '' })
        } else {
            response.status(200).json({ status: true, payload: 'ลบสำเร็จ' })
        }
    })
}