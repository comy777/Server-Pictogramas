const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const uploadImages = async ({
  createReadStream,
  filename,
  mimetype,
  encoding,
}) => {
  const extensionsValid = ["png", "jpg", "jpeg"];
  const name = filename.split(".");
  const extension = name[name.length - 1];
  const resp = await cloudinary.uploader.upload(filename);
};

module.exports = {
  uploadImages,
};
