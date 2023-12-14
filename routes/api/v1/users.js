const express = require("express");
const router = express.Router();
const authenticate = require("../../../middleware/authorization");

const usersController = require("../../../controllers/api/v1/users");

router.get("/", authenticate, usersController.index);
router.get("/:id", authenticate, usersController.indexID);
router.post("/", usersController.create);
router.delete("/:id", authenticate, usersController.remove);
router.put("/:id", authenticate, usersController.update);
router.post('/login', usersController.login);

module.exports = router;