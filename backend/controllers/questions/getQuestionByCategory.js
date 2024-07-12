const { db } = require('../../firebase');
const VALID_CATEGORIES = ['Biology', 'History', 'Culture', 'Travel', 'Art', 'Science', 'Geography'];

// Assuming you're using Express and have a router set up
exports.getQuestionByCategory = async (req, res) => {
    const { category } = req.body;

    if (!VALID_CATEGORIES.includes(category)) {
        return res.status(400).json({ error: "Invalid category name" });
    }

    if (req.method === "GET") {
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

            res.json(questions);
        } catch (error) {
            console.error("Error getting questions by category:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};
