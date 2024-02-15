const connection = require('./connection')

module.exports.financeInsert = (request, response) => {
    const requestEmail = request.body.email
    connection.query('INSERT INTO finance (email) VALUES (?)', [requestEmail], (error, result) => {
        if(error){
            response.status(200).json({status: false, payload: error})
        }else{
            response.status(200).json({status: true, payload: result})
        }
    })
}

module.exports.financeSelect = (request, response) => {
    connection.query('SELECT email, cash_amount, aysel_amount, create_at, update_at from finance', [], (error, result) => {
        if(error){
            response.status(200).json({status: false, payload: error})
        }else{
            response.status(200).json({status: true, payload: result})
        }
    })
}

module.exports.financeUpdate = (request, response) => {
    const requestEmail = request.body.email
    const requestCashAmount = request.body.cash_amount
    const requestAyselAmount = request.body.aysel_amount
    connection.query('UPDATE finance SET cash_amount = ?, aysel_amount = ?, update_at = ? WHERE email = ?', [requestCashAmount, requestAyselAmount, Date.now(), requestEmail], (error, result) => {
        if(error){
            response.status(200).json({status: false, payload: error})
        }else{
            response.status(200).json({status: true, payload: result})
        }
    })
}