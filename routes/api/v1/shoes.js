const express = require("express");
const router = express.Router();
const authenticate = require("../../../middleware/authorization");
const shoesController = require("../../../controllers/api/v1/shoes");

//get shoes 
router.get("/", authenticate, shoesController.index);
router.get("/:id", authenticate, shoesController.indexID);
router.put("/:id", authenticate, shoesController.update);
router.post("/", shoesController.create);
router.delete("/:id", authenticate, shoesController.remove);
router.patch('/:id/status', authenticate, shoesController.editStatus);

module.exports = router;
