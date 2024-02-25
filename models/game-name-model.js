const connection = require('./connection')
const uuid = require('uuid')
module.exports.gameNameInsert = (request, response) => {
    const requestUUID = uuid.v4()
    const requestGameName = request.body.game_name
    connection.query('INSERT INTO game_name (uuid, game_name) VALUES (?, ?)', [requestUUID, requestGameName], (error, result) => {
        if(error){
            response.status(200).json({status: false, payload: error})
        }else{
            response.status(200).json({status: true, payload: result})
        }
    })
}

module.exports.gameNameSelect = (request, response) => {
    connection.query('SELECT uuid, game_name, create_at, update_at from game_name', [], (error, result) => {
        if(error){
            response.status(200).json({status: false, payload: error})
        }else{
            response.status(200).json({status: true, payload: result})
        }
    })
}

module.exports.gameNameUpdate = (request, response) => {
    const requestUUID = request.body.uuid
    const requestGameName = request.body.game_name
    connection.query('UPDATE game_name SET game_name = ?, update_at = ? WHERE uuid = ?', [requestGameName, new Date(), requestUUID], (error, result) => {
        if(error){
            response.status(200).json({status: false, payload: error})
        }else{
            response.status(200).json({status: true, payload: result})
        }
    })
}

module.exports.gameNameDelete = (request, response) => {
    const requestUUID = request.params.uuid
    connection.query('DELETE FROM game_name WHERE uuid = ?', [requestUUID], (error, result) => {
        if(error){
            response.status(200).json({status: false, payload: error})
        }else{
            response.status(200).json({status: true, payload: result})
        }
    })
}