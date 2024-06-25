const express = require("express");
const { db } = require("../../firebase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async function(req, res) {
    if (req.method === "POST") {
        try {
            const { email, password, displayName, photoURL = "" } = req.body;

            if (!email || !password || !displayName) {
                return res.status(400).json({ error: "email, password and displayName are required" });
            }

            // Check if user already exists
            const userSnapshot = await db.collection('users').doc(email).get();
            if (userSnapshot.exists) {
                return res.status(400).json({ error: "User already exists" });
            }

            // Hash and salt password
            const hashedPassword = await bcrypt.hash(password, 10);

            //create user in firebase
            const userRef = await db.collection('users').doc(email);
            await userRef.set({
                userEmail: email,
                password: hashedPassword,
                displayName: displayName,
                photoURL: photoURL,
            });

            // Generate token for first time login, token expires in 2 hours
            const currentTimestamp = Math.floor(Date.now() / 1000); 
            const expiresIn = 7200; 

            const token = jwt.sign(
                {
                    email: email,
                    name: displayName,
                    photoURL: photoURL,
                    iat: currentTimestamp, // Issued at time
                    exp: currentTimestamp + expiresIn, // Expiration time
                },
                process.env.JWT_SECRET
            );

            // Return success response
            return res.status(201).json({
                message: "User registered successfully",
                token: token
            });
        } catch (error) {
            console.error("Error registering new user:", error);
            return res.status(500).json({ "Error registering new user:": error });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
};