const router = require("express").Router();
const controller = require("../controllers/data_controller.js");
const multer = require("multer");
const auth = require("../middlewares/auth.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (_, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
});

router.get("/data", (req, res) => {
  controller.getAllData(req, res);
});

router.get("/data/:urlImagen", auth, (req, res) => {
  controller.getImage(req, res);
});

router.post("/data", auth, upload.single("imagen"), (req, res) => {
  controller.addData(req, res);
});

router.put("/data/:id", auth, upload.single("imagen",false), (req, res) => {
  controller.updateData(req, res);
});

router.delete("/data/:id", auth, (req, res) => {
  controller.deleteData(req, res);
});

module.exports = router;
