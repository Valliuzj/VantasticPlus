const express = require("express");
const { db } = require("../../firebase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.changePassword = async function(req, res) {
    if (req.method === "POST") {
        try {
            const {oldPassword, newPassword} = req.body;
            if (!oldPassword || !newPassword) {
                return res.status(400).json({ error: "oldPassword and newPassword are required" });
            }

            const email = req.user.email;

            const userSnapshot = await db.collection('users').doc(email).get();
            if (!userSnapshot.exists) {
                return res.status(400).json({ error: "User does not exist" });
            }

            const userData = userSnapshot.data();
            const isPasswordCorrect = await bcrypt.compare(oldPassword, userData.password);

            if (!isPasswordCorrect) {
                return res.status(400).json({ error: "Old password is incorrect" });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await db.collection('users').doc(email).update({
                password: hashedPassword
            });

            return res.status(201).json({
              message: "User password changed successfully",
          });
            
        } catch (error) {
            //console.error("Error changing password:", error);
            return res.status(500).json({ error: "Error changing password: " + error.message });
        }  
    } else {
        return res.status(405).json({ error: "Method not allowed" });
}
}
