const express = require("express");
 
const app = express();
 
const multer = require("multer");
 
const path = require("path");
 
const PORT = process.env.PORT || 5000;
 
app.set("view engine", "ejs");
 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const maxSize = 1 * 1024 * 1024; // for 1MB
 
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { fileSize: maxSize },
}).single('file');
 
app.post("/uploadfile",(req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.send(err)
    } else if (err) {
      // An unknown error occurred when uploading.
      res.send(err)
    }
  
    console.log(req.file)
    // Everything went fine.
  })
});
 
app.get("/", (req, res) => {
  res.render("index");
});
 
app.listen(PORT, () => {
  console.log(`App is listening on Port http://localhost:${PORT}`);
});