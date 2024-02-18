const connection = require('./connection')
const jsonwebtoken = require('jsonwebtoken')
const SECRET = process.env.SECRET
const multer = require('multer')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const storageBanner = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './asset/banner')
    },
    filename: (request, file, callback) => {
        const fileExtension = file.originalname.split('.')[1]
        const fileName = `${uuid.v4()}${Date.now()}${Math.round(Math.random() * 1E9)}.${fileExtension}`
        callback(null, fileName)
        request.on('aborted', () => {
            const fullPath = path.join('./asset/banner', fileName)
            fs.unlinkSync(fullPath)
        })
    }
})

const upload = multer({
    storage: storageBanner,
    fileFilter: (request, file, callback) => {
        if(file.mimetype === 'image/png'){
            callback(null, true)
        }else{
            callback(new Error('ใช้ได้แค่ไฟล์ .png เท่านั้น'), false)
        }
    }
})

module.exports.bannerInsert = (request, response) => {
    upload.single('file')(request, response, (error) => {
        if(error){
            response.status(200).json({status: false, payload: 'ใช้ได้แค่ไฟล์ .png เท่านั้น'})
        }else{
            try{
                const token = request.cookies.token
                jsonwebtoken.verify(token, SECRET)
                const requestUUID = uuid.v4()
                const requestInformation = request.file.filename
                connection.query('INSERT INTO banner (uuid, information) VALUES (?, ?)', [requestUUID, requestInformation], (error, result) => {
                    if(error){
                        fs.unlinkSync(path.join('./asset/banner', request.file.filename))
                        response.status(200).json({status: false, payload: 'เพิ่ม Banner ล้มเหลว'})
                    }else{
                        response.status(200).json({status: true, payload: 'เพิ่ม Banner สำเร็จ'})
                    }
                })
            }catch(error){
                fs.unlinkSync(path.join('./asset/banner', request.file.filename))
                response.status(200).json({status: false, payload: 'เพิ่ม Banner ล้มเหลว'})
            }
        }
    })
}

module.exports.bannerSelect = (request, response) => {
    connection.query('SELECT uuid, information, create_at, update_at FROM banner', [], (error, result) => {
        if(error){
            response.status(200).json({status: false, payload: error})
        }else{
            response.status(200).json({status: true, payload: result})
        }
    })
}

module.exports.bannerUpdate = (request, response) => {
    upload.single('file')(request, response, (error) => {
        if(error){
            response.status(200).json({status: false, payload: 'ใช้ได้แค่ไฟล์ .png เท่านั้น'})
        }else{
            try{
                const token = request.cookies.token
                jsonwebtoken.verify(token, SECRET)
                const requestUUID = request.body.uuid
                const requestInformation = request.file.filename
                connection.query('SELECT information FROM banner WHERE uuid = ?', [requestUUID], (error, result) => {
                    if(error){
                        response.status(200).json({status: false, payload: 'แก้ไขล้มเหลว'})
                    }else{
                        const information = result[0].information
                        fs.unlinkSync(path.join('./asset/banner', information))
                        connection.query('UPDATE banner SET information = ?, update_at = ? WHERE uuid = ?', [requestInformation, new Date(), requestUUID], (error, result) => {
                            if(error){
                                response.status(200).json({status: false, payload: 'แก้ไขล้มเหลว'})
                            }else{
                                response.status(200).json({status: true, payload: 'แก้ไขสำเร็จ'})
                            }
                        })
                    }
                })
            }catch(error){
                fs.unlinkSync(path.join('./asset/banner', request.file.filename))
                response.status(200).json({status: false, payload: 'แก้ไขล้มเหลว'})
            }
        }
    })
}

module.exports.bannerDelete = (request, response) => {
    const requestUUID = request.body.uuid
    connection.query('SELECT information FROM banner WHERE uuid = ?', [requestUUID], (error, result) => {
        if(error){
            response.status(200).json({status: false, payload: 'เพิ่ม Banner ล้มเหลว'})
        }else{
            const information = result[0].information
            connection.query('DELETE FROM banner WHERE uuid = ?', [requestUUID], (error, result) => {
                if(error){
                    response.status(200).json({status: false, payload: 'เพิ่ม Banner ล้มเหลว'})
                }else{
                    fs.unlinkSync(path.join('./asset/banner', information))
                    response.status(200).json({status: true, payload: 'ลบ Banner สำเร็จ'})
                }
            })
        }
    })
}
// module.exports.bannerInsert = (request, response) => {
//     const requestUUID = request.file.filename.split('.')[0]
//     const requestInformation = `${request.file.destination}/${request.file.filename}`
//     connection.query('INSERT INTO banner (uuid, information) VALUES (?, ?)', [requestUUID, requestInformation], (error, result) => {
//         if(error){
//             response.status(200).json({status: false, payload: error})
//         }else{
//             response.status(200).json({status: true, payload: result})
//         }
//     })
// }

// module.exports.bannerSelect = (request, response) => {
//     connection.query('SELECT uuid, information, create_at, update_at FROM banner', [], (error, result) => {
//         if(error){
//             response.status(200).json({status: false, payload: error})
//         }else{
//             response.status(200).json({status: true, payload: result})
//         }
//     })
// }

// module.exports.bannerUpdate = (request, response) => {
//     const requestUUID = request.body.uuid
//     const requestInformation = `${request.file.destination}/${request.file.filename}`
//     connection.query('UPDATE banner SET information = ?, update_at = ? WHERE uuid = ?', [requestInformation, Date.now(), requestUUID], (error, result) => {
//         if(error){
//             response.status(200).json({status: false, payload: error})
//         }else{
//             response.status(200).json({status: true, payload: result})
//         }
//     })
// }

// module.exports.bannerDelete = (request, response) => {
//     const requestUUID = request.body.uuid
//     connection.query('DELETE FROM banner WHERE uuid = ?', [requestUUID], (error, result) => {
//         if(error){
//             response.status(200).json({status: false, payload: error})
//         }else{
//             response.status(200).json({status: true, payload: result})
//         }
//     })
// }