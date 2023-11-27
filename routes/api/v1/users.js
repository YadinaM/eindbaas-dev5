const express = require("express");
const router = express.Router();

const usersController = require("../../../controllers/api/v1/users");

router.get("/", usersController.index);
router.get("/:id", usersController.indexID);

module.exports = router;