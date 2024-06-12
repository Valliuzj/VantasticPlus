const express = require("express");
const router = express.Router();

const registerUserController = require("../controllers/users/registerUser");
const getSingleUserController = require("../controllers/users/getSingleUser");

router.post("/register", registerUserController.registerUser);
router.get("/user/:email", getSingleUserController.getSingleUser);

module.exports = router;