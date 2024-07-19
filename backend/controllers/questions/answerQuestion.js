const { db } = require('../../firebase');

// this api is only to record user interaction with the question when they answer it CORRECTLY

exports.answerQuestion = async (req, res) => {
    if (req.method === "POST") {   
        try{
            const { questionId } = req.body;

            if (!questionId) {
                return res.status(400).json({ error: "questionID is required" });
            }

            const userId = req.user.email;
            const userRef = db.collection('users').doc(userId);

            const answeredRef = userRef.collection('interactions').doc(questionId);

            await answeredRef.set({
            answered: true
            }, { merge: true });

            res.status(200).json({ message: `Recorded answered for user ${userId} on question ${questionId}` });
        } catch (error) {
            return res.status(500).json({ "Error answering question:": error });
        }    
    }   
};