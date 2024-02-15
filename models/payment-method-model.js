const connection = require('./connection')

module.exports.paymentMethodInsert = (request, response) => {
    const requestUUID = request.file.filename.split('.')[0]
    const requestMethod = request.body.method
    const requestInformation = `${request.file.destination}/${request.file.filename}`
    connection.query('INSERT INTO payment_method (uuid, method, information) VALUES (?, ?, ?)', [requestUUID, requestMethod, requestInformation], (error, result) => {
        if(error){
            response.status(200).json({status: false, payload: error})
        }else{
            response.status(200).json({status: true, payload: result})
        }
    })
}

module.exports.paymentMethodSelect = (request, response) => {
    connection.query('SELECT uuid, method, information, create_at, update_at from payment_method', [], (error, result) => {
        if(error){
            response.status(200).json({status: false, payload: error})
        }else{
            response.status(200).json({status: true, payload: result})
        }
    })
}

module.exports.paymentMethodUpdate = (request, response) => {
    const requestUUID = request.body.uuid
    const requestInformation = `${request.file.destination}/${request.file.filename}`
    connection.query('UPDATE payment_method SET information = ?, update_at = ? WHERE uuid = ?', [requestInformation, Date.now(), requestUUID], (error, result) => {
        if(error){
            response.status(200).json({status: false, payload: error})
        }else{
            response.status(200).json({status: true, payload: result})
        }
    })
}