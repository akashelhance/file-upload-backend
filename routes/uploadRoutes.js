const express = require("express");
const upload = require("../middlewares/fileUpload");
const { uploadFile } = require("../controllers/uploadController");

const router = express.Router();

router.post("/", upload.single("file"), uploadFile);

router.post("/dynamic-column", upload.single("file"), dynamicColumn);

module.exports = router;
