const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'libreria',
        allowedFormats: ["jpg", "png", "jpeg", "gif", "pdf", "pptx"]
    }
});

const upload = multer({ storage });

module.exports = upload;