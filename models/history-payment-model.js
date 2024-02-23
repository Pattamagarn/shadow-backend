const connection = require('./connection')
const uuid = require('uuid')
const jsonwebtoken = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports.createHistoryPayment = (request, response) => {
    const requestUUID = uuid.v4()
    const token = request.cookies.token
    const decoded = jsonwebtoken.verify(token, SECRET)
    const requestEmail = decoded.email
    const requestAyselAmount = request.body.aysel_amount
    const requestCashAmount = request.body.cash_amount
    const requestPaymentStatus = request.body.payment_status
    connection.query('INSERT INTO history_payment (uuid, email , aysel_amount , cash_amount, payment_status, create_at) VALUE(?,?,?,?,?,?)',
        [requestUUID, requestEmail, requestAyselAmount, requestCashAmount, requestPaymentStatus, new Date()], (error, result) => {
            if (error) {
                response.status(200).json({ status: false, payload: '' })
            } else {
                response.status(200).json({ status: true, payload: 'สร้างสำเร็จ' })
            }
        })
}

module.exports.readHistoryPayment = (request, response) => {
    const token = request.cookies.token
    const decoded = jsonwebtoken.verify(token, SECRET)
    const requestEmail = decoded.email
    connection.query('SELECT aysel_amount , cash_amount , payment_status , create_at FROM history_payment WHERE email = ?', [requestEmail], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}