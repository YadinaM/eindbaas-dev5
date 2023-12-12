const express = require("express");
const router = express.Router();

const shoesController = require("../../../controllers/api/v1/shoes");

//get shoes 
router.get("/", shoesController.index);
router.get("/:id", shoesController.indexID);
router.put("/:id", shoesController.update);
router.post("/", shoesController.create);
router.delete("/:id", shoesController.remove);
router.patch('/:id/status', shoesController.editStatus);

module.exports = router;
