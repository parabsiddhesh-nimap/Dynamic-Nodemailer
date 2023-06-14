const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        let fileName = req.body.senderEmail;
        // console.log('fileName',req.body.senderEmail)
        console.log('fileName',file)
        fileName = fileName.split('@')[0];
        return cb(null,`${fileName}-${Date.now()}-${file.originalname}` )
    }
})
const upload = multer({ storage: storage });

module.exports = fileUpload = upload.single('avatar') ? upload.single('avatar') : next();
