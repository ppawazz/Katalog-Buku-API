const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "book_covers", // Folder di Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => file.originalname,
  },
});

module.exports = { cloudinary, storage };
