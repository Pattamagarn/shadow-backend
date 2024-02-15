const connection = require('./connection')
const uuid = require('uuid')
const jsonwebtoken = require('jsonwebtoken')
const SECRET = process.env.SECRET
const twvoucher = require('@fortune-inc/tw-voucher')

module.exports.postTopUp = (request, response) => {
    const giftTruemoney = request.body.giftTruemoney
    connection.query('SELECT email, cash_amount, aysel_amount, create_at, update_at FROM finance', [], (error, result) => {
        if(error){
            response.status(200).json({status: false, payload: 'ดึงข้อมูลล้มเหลว'})
        }else{
            response.status(200).json({status: true, payload: result})
        }
    })
    twvoucher(process.env.PHONEVOUCHER, giftTruemoney).then((redeemed) => {
        connection.query('INSERT INTO history_payment (uuid, email, aysel_amount, cash_amount, payment_status) VALUES (?, ?)', [uuid.v4(), redeemed.amount], (error, result) => {
            if (error) response.status(200).json({status: false, message: 'การเก็บธุรกรรมเติมเงินล้มเหลว'})
            response.status(200).json({status: true, message: 'เติมเงินสำเร็จ จำนวนเงิน ' + redeemed.amount + ' บาท'})
        })
    }).catch((error) => {
        response.status(200).json({status: false, message: 'เติมเงินล้มเหลว'})
    })
}