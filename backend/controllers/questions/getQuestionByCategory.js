const { db } = require('../../firebase');
const VALID_CATEGORIES = ['Biology', 'History', 'Culture', 'Travel', 'Art', 'Science', 'Geography'];

exports.getQuestionByCategory = async (req, res) => {
    const { category } = req.query;

    if (!VALID_CATEGORIES.includes(category)) {
        return res.status(400).json({ error: "Invalid category name" });
    }

    try {
        const questionsSnapshot = await db.collection('questions')
            .where('category', '==', category)
            .get();

        if (questionsSnapshot.empty) {
            return res.status(404).json({ error: "No questions found for this category" });
        }

        const questions = [];
        questionsSnapshot.forEach(doc => {
            questions.push({ id: doc.id, ...doc.data() });
        });

            const userEmail = req.user.email;
            const userInteractionsSnapshot = await db.collection('userData')
            .doc(userEmail)
            .collection('interactions')
            .where('answered', '==', true)
            .get();

            const answeredQuestionIds = [];
            userInteractionsSnapshot.forEach(doc => {
                answeredQuestionIds.push(doc.id);
            });

            const unansweredQuestions = [];
            questionsSnapshot.forEach(doc => {
                if (!answeredQuestionIds.includes(doc.id)) {
                    unansweredQuestions.push({ id: doc.id, ...doc.data() });
                }
            });
            if (unansweredQuestions.length === 0) {
                return res.status(404).json({ error: "You have answered all the questions in this category" });
            }

            const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
            const randomQuestion = unansweredQuestions[randomIndex];

            res.json(randomQuestion);
        } catch (error) {
            console.error("Error getting question by category:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};