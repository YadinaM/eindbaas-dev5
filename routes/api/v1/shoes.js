const express = require("express");
const router = express.Router();

const shoesController = require("../../../controllers/api/v1/shoes");

//get shoes 
router.get("/", shoesController.index);


module.exports = router;