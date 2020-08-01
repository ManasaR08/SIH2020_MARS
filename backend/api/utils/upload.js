const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/temp')
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.split(".").pop();
        let fileName = file.fieldname+'-'+Date.now()+'.'+ext;
        req.body.pdf = 'http://localhost:3000/public/'+fileName;
        cb(null, fileName);
    }
})


module.exports = multer({ storage: storage });