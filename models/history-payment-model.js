const connection = require('./connection')
const uuid = require('uuid')

module.exports.createHistoryPayment = (request, response) => {
    const email = request.body.email
    const ayselAmount = request.body.aysel_amount
    const cashAmount = request.body.cash_amount
    const paymentStatus = request.body.payment_status
    connection.query('INSERT INTO history_payment (uuid, email , aysel_amount , cash_amount, payment_status, create_at) VALUE(?,?,?,?,?,?)',
        [uuid.v4(), email, ayselAmount, cashAmount, paymentStatus, new Date()], (error, result) => {
            if (error) {
                response.status(200).json({ status: false, payload: '' })
            } else {
                response.status(200).json({ status: true, payload: 'สร้างสำเร็จ' })
            }
        })
}

module.exports.readHistoryPayment = (request, response) => {
    const email = request.body.email
    connection.query('SELECT aysel_amount , cash_amount , payment_status , create_at FROM history_payment WHERE email = ?', [email], (error, result) => {
        if (error) {
            response.status(200).json({ status: false, payload: [] })
        } else {
            response.status(200).json({ status: true, payload: result })
        }
    })
}