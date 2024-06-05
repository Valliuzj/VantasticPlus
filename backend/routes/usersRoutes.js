const express = require("express");
const router = express.Router();

const getSingleUserController = require("../controllers/users/getSingleUser");

router.get("/user/:email", getSingleUserController.getSingleUser);

module.exports = router;