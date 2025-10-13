const path = require("path");

const genFile = (filename) => {
   let modiName = new Date().valueOf() + "-" + filename;
   modiName = modiName.replace(/\s/g, "");
   return modiName;
}
const getSavePath = (filename) => path.join(__dirname, "../public/uploads", filename);
const getImageLink = (filename) => process.env.IMG_PATH + "/" + filename;



const saveFile = async (req, res, next) => {
  try {
    if (!req.files || !req.files.File) {
      return res.status(400).send("No file uploaded.");
    }

    let file = req.files.File; 
    let filename = genFile(file.name);
    let filePath = getSavePath(filename);

    await file.mv(filePath); 

    let imgLink = getImageLink(filename);
    req.body.img = imgLink;
    next();
  } catch (err) {
    console.error("Error saving file:", err);
    res.status(500).send("File save failed.");
  }
};



const multipleFile = (req,res,next)=>{
   try {
      if( !req.files  ){
        return res.status(400).send("No file uploaded.");
      }
      let files = req.files.file;
      if(!Array.isArray(files)){
        files = [files];
      }
     if (!req.body) req.body = {};
      files.forEach(file => {
        let filename = genFile(file.name);
        let filePath = getSavePath(filename);
        file.mv(filePath);
      });
      let fileNames = files.map(file => {
      let filename = genFile(file.name);
        return getImageLink(filename);
      });
      req.body.image = fileNames;
      next();
   }catch(erorr){
    console.log("error" , erorr)
     res.status(500).send("File save failed.");
   }
}



module.exports = {saveFile ,  multipleFile};