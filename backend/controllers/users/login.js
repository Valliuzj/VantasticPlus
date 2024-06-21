const express = require("express");
const { db }= require("../../firebase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//get id token or login route
exports.userLogin = async function (req, res) {
  if (req.method === "POST") {
    try {
        const { email, password } = req.body;

        const userRef = await db.collection('users').doc(email);
        const doc = await userRef.get();
        
        if (!doc.exists) {
            return res.status(400).json({ error: "Invalid email" });
        }

        const user = doc.data();
        const userPassword = user.password;
        const validPassword = await bcrypt.compare(password, userPassword);

        if (!validPassword) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const currentTimestamp = Math.floor(Date.now() / 1000); 
        const expiresIn = 7200; 

        const token = jwt.sign(
            {
            email: user.userEmail,
            name: user.displayName,
            photoURL: user.photoURL || "",
            iat: currentTimestamp, 
            exp: currentTimestamp + expiresIn, 
            },
            process.env.JWT_SECRET
        );

        // Return success response
        return res.status(201).json({
          message: "User logged in successfully",
          token: token
      });

    } catch (error) {
      //console.error("Error logging in:", error);
      return res.status(500).json({ error: "Error logging in: " + error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};