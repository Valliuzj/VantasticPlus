const { db } = require("../firebase");
const jwt = require("jsonwebtoken");

exports.protect = async function(req, res, next) {
    try {
        const bearerToken = req.headers.authorization ?.split(" ")[1];

        if (!bearerToken) {
            return res.status(401).json({ error: "Missing authentication token" });
        }

        // Verify the JWT
        const decodedToken = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.user = decodedToken; // Attach the user to the request object

        const userSnapshot = await db.collection('users').doc(decodedToken.email).get();

        if (!userSnapshot.exists) {
            return res.status(404).json({ error: "User not found" });
        }

        next(); 
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ error: "Invalid authentication token" });
    }
};

