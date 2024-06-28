const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");

const registerUserController = require("../controllers/users/registerUser");
const getSingleUserController = require("../controllers/users/getSingleUser");
const loginController = require("../controllers/users/login");

router.post("/register", registerUserController.registerUser);
router.get("/me", protect, getSingleUserController.getSingleUser);
router.post("/login", loginController.userLogin);

module.exports = router;