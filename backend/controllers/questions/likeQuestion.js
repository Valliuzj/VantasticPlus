const { db } = require('../../firebase');

exports.likeQuestion = async (req, res) => {
    if (req.method === "POST") {   
        try{
            const { questionId } = req.body;

            if (!questionId) {
                return res.status(400).json({ error: "questionID is required" });
            }

            const userId = req.user.email;
            const userRef = db.collection('users').doc(userId);

            const likeRef = userRef.collection('interactions').doc(questionId);

            await likeRef.set({
            liked: true
            }, { merge: true });

            res.status(200).json({ message: `Recorded liked for user ${userId} on question ${questionId}` });

        } catch (error) {
            return res.status(500).json({ "Error answering question:": error });
        }    
    }   
};