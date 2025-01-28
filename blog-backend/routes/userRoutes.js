const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middelware/auth");

router.post("/createUser", userController.createUser);
router.post("/login", userController.login);

router.get("/users", userController.getAllUsers);
router.put("/users/:id", userController.updateUserRole);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
