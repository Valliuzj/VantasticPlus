const { db } = require('../../firebase');

exports.getSingleQuestion = async (req, res) => {
    if (req.method === "GET") {
        try {
            const { questionID } = req.body;
            if (!questionID) {
                return res.status(400).json({ error: "questionID is required" });
            }

            const questionRef = db.collection('questions').doc(questionID);
            const doc = await questionRef.get();

            if (!doc.exists) {
                return res.status(404).json({ error: "Question not found" });
            }

            return res.status(200).json(doc.data());
        } catch (error) {
            //console.error("Error getting question:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
};