const path = require("path");
const fs = require("fs");
const CustomError = require("./CustomError");

const genFile = (filename) => {
  let modiName = new Date().valueOf() + "-" + filename;
  modiName = modiName.replace(/\s/g, "");
  return modiName;
};

const getSavePath = (filename) => path.join(__dirname, "../public/uploads", filename);
const getImageLink = (filename) => process.env.IMG_PATH + "/" + filename;

const validateFile = (file) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.mimetype)) {
    throw new CustomError("Invalid file type. Only JPEG, PNG and WEBP are allowed.", 400);
  }
  if (file.size > maxSize) {
    throw new CustomError("File size too large. Max limit is 5MB.", 400);
  }
};

const saveFile = async (req, res, next) => {
  try {
    if (!req.files || !req.files.File) {
      return res.status(400).send("No file uploaded.");
    }

    let file = req.files.File;
    validateFile(file);

    let filename = genFile(file.name);
    let filePath = getSavePath(filename);

    await file.mv(filePath);

    let imgLink = getImageLink(filename);
    req.body.img = imgLink;
    next();
  } catch (err) {
    next(err instanceof CustomError ? err : new CustomError("File save failed.", 500));
  }
};

const multipleFile = async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).send("No file uploaded.");
    }

    let files = req.files.file;
    if (!Array.isArray(files)) {
      files = [files];
    }

    if (!req.body) req.body = {};

    // Validate all files first
    files.forEach(validateFile);

    const fileNames = [];
    // Use for...of to await mv correctly
    for (const file of files) {
      const filename = genFile(file.name);
      const filePath = getSavePath(filename);
      await file.mv(filePath);
      fileNames.push(getImageLink(filename));
    }

    req.body.image = fileNames;
    next();
  } catch (err) {
    next(err instanceof CustomError ? err : new CustomError("File save failed.", 500));
  }
};

module.exports = { saveFile, multipleFile };