const express = require('express')
const router = express.Router()
const { paymentMethodInsert, paymentMethodSelect, paymentMethodUpdate } = require('../controllers/payment-method-controller')
const multer = require('multer')
const uuid = require('uuid')
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './images/payment-method-image')
    },
    filename: (request, file, callback) => {
        const fileExtension = file.originalname.split('.')[1]
        callback(null, `${uuid.v4()}.${fileExtension}`)
    }
})
const upload = multer({ storage: storage })

router.post('/payment-method-insert', upload.single('file'), paymentMethodInsert)
router.get('/payment-method-select', paymentMethodSelect)
router.patch('/payment-method-update', upload.single('file'), paymentMethodUpdate)

module.exports = router