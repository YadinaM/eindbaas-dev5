const express = require("express");
const router = express.Router();

const usersController = require("../../../controllers/api/v1/users");

router.get("/", usersController.index);
router.get("/:id", usersController.indexID);
router.post("/", usersController.create);
router.delete("/:id", usersController.remove);
router.put("/:id", usersController.update);
router.post('/login', usersController.login);

module.exports = router;