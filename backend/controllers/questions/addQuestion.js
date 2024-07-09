const { db } = require('../../firebase');

const VALID_CATEGORIES = ['Biology', 'History', 'Culture', 'Travel', 'Art', 'Science', 'Geography'];
const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];

exports.addQuestion = async (req, res) => {
    if (req.method === "POST"){
        try{
            const {question, choices, answer, category, difficulty} = req.body;
            if (!question || !choices || answer === undefined || !category || !difficulty) {
                return res.status(400).json({ error: "question, answer, choices, category and difficulty are required" });
            }

            if (!VALID_CATEGORIES.includes(category)) {
                return res.status(400).json({ error: "Invalid category" });
            }

            if (!VALID_DIFFICULTIES.includes(difficulty)) {
                return res.status(400).json({ error: "Invalid difficulty" });
            }

            if (typeof answer !== 'number' || answer < 0 || answer >= 4) {
                return res.status(400).json({ error: "Invalid answer" });
            }

            if (choices.length !== 4) {
                return res.status(400).json({ error: "Choices must be an array of 4" });
            }

            const questionRef = await db.collection('questions').doc();
            await questionRef.set({
                question: question,
                choices: choices,
                answer: answer,
                category: category,
                difficulty: difficulty,
                like: 0,
            });

            return res.status(201).json({
                message: "Question added successfully",
                questionID: questionRef.id
            });
        } catch (error) {
            return res.status(500).json({ "Error adding question:": error });
        }
    }
};
