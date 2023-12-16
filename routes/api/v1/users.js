const express = require("express");
const router = express.Router();

const usersController = require("../../../controllers/api/v1/users");
const authorizeAdmin = require('../../../middleware/authorization');

router.get("/", authorizeAdmin, usersController.index);
router.get("/:id", authorizeAdmin, usersController.indexID);
router.post("/", usersController.create);
router.delete("/:id", authorizeAdmin, usersController.remove);
router.patch("/:id", authorizeAdmin, usersController.update);
router.post('/login', usersController.login);

module.exports = router;