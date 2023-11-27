const express = require("express");
const router = express.Router();

const shoesController = require("../../../controllers/api/v1/shoes");

//get shoes 
router.get("/", shoesController.index);
router.get("/:id", shoesController.indexID);
router.put("/:id", shoesController.update);
router.post("/", shoesController.create);

module.exports = router;
