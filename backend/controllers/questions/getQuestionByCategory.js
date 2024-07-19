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
        console.log(`Fetching interactions for user: ${userEmail}`);

        const userInteractionsSnapshot = await db.collection('users')
            .doc(userEmail)
            .collection('interactions')
            .where('answered', '==', true)
            .get();

        const answeredQuestionIds = new Set();
        userInteractionsSnapshot.forEach(doc => {
            console.log('Answered Question Document:', doc.id, doc.data());
            answeredQuestionIds.add(doc.id);
        });

        //console.log('Answered Question IDs:', Array.from(answeredQuestionIds));

        const unansweredQuestions = questions.filter(question => !answeredQuestionIds.has(question.id));

        //console.log('Unanswered Questions:', unansweredQuestions.map(question => question.id));

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