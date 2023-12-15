const express = require("express");
const router = express.Router();

const shoesController = require("../../../controllers/api/v1/shoes");
const authorizeAdmin = require('../../../middleware/authorization');

//get shoes 
router.get("/", authorizeAdmin, shoesController.index);
router.get("/:id", authorizeAdmin, shoesController.indexID);
router.put("/:id", authorizeAdmin, shoesController.update);
router.post("/", shoesController.create);
router.delete("/:id", authorizeAdmin, shoesController.remove);
router.patch('/:id/status', authorizeAdmin, shoesController.editStatus);

module.exports = router;
