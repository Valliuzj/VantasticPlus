const { db } = require("../../firebase");

exports.getSingleUser = async function(req, res) {
    if (req.method === "GET") {
        try {
            // 从 req.user 中获取 email
            const email = req.user.email.toLowerCase();

            // 从数据库中检索用户信息
            const userSnapshot = await db.collection('users').doc(email).get();
            if (!userSnapshot.exists) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            const { password, ...userDataWithoutPassword } = userSnapshot.data();
            res.status(200).json({ userData: userDataWithoutPassword });
        } catch (error) {
            console.error("Error retrieving user:", error);
            res.status(500).json({ error: "Error retrieving user" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
