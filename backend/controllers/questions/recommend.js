const axios = require('axios');
const admin = require('firebase-admin');
const db = admin.firestore();

async function getAllQuestions() {
  const questionsSnapshot = await db.collection('questions').get();
  const questions = [];
  questionsSnapshot.forEach(doc => {
    questions.push({ id: doc.id, ...doc.data() });
  });
  return questions;
}

async function getUserInteractions(userEmail) {
  const userRef = db.collection('users').doc(userEmail);
  const interactionsSnapshot = await userRef.collection('interactions').get();
  const interactions = {};
  interactionsSnapshot.forEach(doc => {
    interactions[doc.id] = doc.data();
  });
  return interactions;
}

async function getTopLikedQuestions() {
  const questionsSnapshot = await db.collection('questions').orderBy('like', 'desc').limit(10).get();
  const topQuestions = [];
  questionsSnapshot.forEach(doc => {
    topQuestions.push({ id: doc.id, ...doc.data() });
  });
  return topQuestions;
}

async function getRecommendation(userEmail) {
  const interactions = await getUserInteractions(userEmail);
  const questions = await getAllQuestions();

  if (Object.keys(interactions).length === 0) {
    // if user has no interactions, recommend one of the top 10 most liked questions randomly
    const topQuestions = await getTopLikedQuestions();
    const recommendedQuestion = topQuestions[Math.floor(Math.random() * topQuestions.length)];
    return recommendedQuestion;
  }

  const data = {
    interactions: interactions,
    questions: questions
  };

  try {
    const response = await axios.post('http://localhost:8123/recommend', data);
    return response.data.recommended_question;
  } catch (error) {
    console.error('Error getting recommendation from model:', error);
    throw error;
  }
}

exports.recommend = async (req, res) => {
  const userEmail = req.user.email; 
  try {
    const recommendedQuestion = await getRecommendation(userEmail);
    res.status(200).json(recommendedQuestion);
  } catch (error) {
    res.status(500).send('Error generating recommendation');
  }
};
