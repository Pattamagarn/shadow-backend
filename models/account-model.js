const connection = require('./connection')
const jsonwebtoken = require('jsonwebtoken')
const SECRET = process.env.SECRET
const multer = require('multer')
const uuid = require('uuid')
const storageAvatar = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './images/account-image')
    },
})

module.exports.validationAccount = (request, response) => {
    const atLeastOneUppercase = /[A-Z]/g
    const atLeastOneLowercase = /[a-z]/g
    const atLeastOneNumeric = /[0-9]/g
    const atLeastOneSpecialChar = /[#?!@$%^&*-]/g
    const eightCharsOrMore = /.{8,}/g
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    const requestEmail = request.body.email
    const requestUsername = request.body.username
    const requestPassword = request.body.password
    const requestConfirmPassword = request.body.confirmPassword

    if(requestUsername.length <= 0){
        response.status(200).json({status:false, payload: 'กรุณากรอกนามแฝง'})
    }else if(requestEmail.length <= 0){
        response.status(200).json({status:false, payload: 'กรุณากรอกอีเมล'})
    }else if(requestPassword.length <= 0){
        response.status(200).json({status:false, payload: 'กรุณากรอกรหัสผ่าน'})
    }else if(requestConfirmPassword.length <= 0){
        response.status(200).json({status:false, payload: 'กรุณายืนยันรหัสผ่าน'})
    }else if(!requestEmail.match(emailRegex)){
        response.status(200).json({status:false, payload: 'กรุณากรอกรูปแบบอีเมลให้ถูกต้อง'})
    }else if(!requestPassword.match(eightCharsOrMore)){
        response.status(200).json({status:false, payload: 'ต้องการความยาวรหัสผ่านอย่างน้อย 8 ตัว'})
    }else if(!requestPassword.match(atLeastOneLowercase)){
        response.status(200).json({status:false, payload: 'ต้องการตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว'})
    }else if(!requestPassword.match(atLeastOneUppercase)){
        response.status(200).json({status:false, payload: 'ต้องการตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว'})
    }else if(!requestPassword.match(atLeastOneNumeric)){
        response.status(200).json({status:false, payload: 'ต้องการตัวเลขอย่างน้อย 1 ตัว'})
    }else if(!requestPassword.match(atLeastOneSpecialChar)){
        response.status(200).json({status:false, payload: 'ต้องการตัวอักษรพิเศษอย่างน้อย 1 ตัว'})
    }else if(requestPassword !== requestConfirmPassword){
        response.status(200).json({status:false, payload: 'กรุณากรอกรหัสผ่าน และ ยืนยันรหัสผ่านให้ตรงกัน'})
    }else{
        response.status(200).json({status:true, payload: 'ผ่านการตรวจสอบ'})
    }
}

const getDefaultAvatar = (requestEmail) => {
    const avatarName = requestEmail.at(0).toLowerCase()
    if(avatarName !== requestEmail.at(0).toUpperCase()){
        return `${avatarName}.png`
    }else{
        return 'default.png'
    }
}

module.exports.signUpAccount = (request, response) => {
    const requestEmail = request.body.email
    const requestUsername = request.body.username
    const requestAvatar = getDefaultAvatar(requestEmail)
    connection.query('INSERT INTO account (email, username, avatar) VALUES (?, ?, ?)', [requestEmail, requestUsername, requestAvatar], (error, result) => {
        if(error){
            response.status(200).json({status: false, payload: 'สร้างบัญชีล้มเหลว'})
        }else{
            connection.query('INSERT INTO finance (email) VALUES (?)', [requestEmail], (error, result) => {
                if(error){
                    response.status(200).json({status: false, payload: 'สร้างบัญชีล้มเหลว'})
                }else{
                    response.status(200).json({status: true, payload: 'สร้างบัญชีสำเร็จ'})
                }
            })
        }
    })
}

module.exports.signInAccount = (request, response) => {
    const requestEmail = request.body.email
    connection.query('SELECT email, suspended_status, role FROM account WHERE email = ?', [requestEmail], (error, result) => {
        if(error || result.length !== 1){
            response.status(200).json({status: false, payload: 'ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง'})
        }else if(result[0].suspended_status !== 0){
            response.status(200).json({status: false, payload: 'บัญชีนี้ถูกระงับ'})
        }else{ 
            const token = jsonwebtoken.sign({email: result[0].email}, SECRET, { expiresIn: '1h' })
            response.cookie('token', token, {
                maxAge: 300000,
                secure: true,
                httpOnly: true,
                sameSite: 'none',
            })
            response.status(200).json({status: true, payload: token})
        }
    })
}

module.exports.authenticationAccount = (request, response) => {
    try{
        const token = request.cookies.token
        const decoded = jsonwebtoken.verify(token, SECRET)
        const requestEmail = decoded.email
        connection.query('SELECT email, username, avatar, role, gacha_count FROM account WHERE email = ?', [requestEmail], (error, result) => {
            console.log(result)
            if(error || result.length !== 1){
                response.status(200).json({status: false, payload: 'เกิดข้อผิดพลาดที่ไม่รู้จัก'})
            }else{
                let resultAccount = result
                connection.query('SELECT aysel_amount FROM finance WHERE email = ?', [requestEmail], (error, result) => {
                    if(error || result.length !== 1){
                        response.status(200).json({status: false, payload: 'เกิดข้อผิดพลาดที่ไม่รู้จัก'})
                    }else{
                        resultAccount[0].aysel_amount = result[0].aysel_amount
                        response.status(200).json({status: true, payload: resultAccount[0]})
                    }
                })
            }
        })
    }catch(error){
        response.status(200).json({status: false, payload: 'เกิดข้อผิดพลาดที่ไม่รู้จัก'})
    }
}

module.exports.editAccount = (request, response) => {
}