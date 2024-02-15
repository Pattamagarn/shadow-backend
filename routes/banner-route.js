const express = require('express')
const router = express.Router()
const { bannerInsert, bannerSelect, bannerUpdate, bannerDelete } = require('../controllers/banner-controller')
const multer = require('multer')
const uuid = require('uuid')
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './images/banner-image')
    },
    filename: (request, file, callback) => {
        const fileExtension = file.originalname.split('.')[1]
        callback(null, `${uuid.v4()}.${fileExtension}`)
    }
})
const upload = multer({ storage: storage })

router.post('/banner-insert', upload.single('file'), bannerInsert)
router.get('/banner-select', bannerSelect)
router.patch('/banner-update', upload.single('file'), bannerUpdate)
router.delete('/banner-delete', upload.single('file'), bannerDelete)

module.exports = router