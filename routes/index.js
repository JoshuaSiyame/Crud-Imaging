// import component
const express = require("express");
const multer = require("multer");

// import image instance
const Image = require("../model/index");

// multer configuration, storing image file as buffer
const storage = multer.memoryStorage();
const upload = multer({ dest: storage });

// router instance
const router = express.Router();

// endpoints
router.get("/test", (req, res)=>{
    try {
        res.status(200).send("Testing working");
    } catch (error) {
        console.error("Failed to get test endpoint: ", error);
    }
});

// export router instance
module.exports = router;