const connection = require('./connection')

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