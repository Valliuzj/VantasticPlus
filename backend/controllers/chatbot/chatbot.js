const axios = require('axios');

const openaiApiKey = process.env.OPENAI_API_KEY;

exports.chatbot = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Please ask a question' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-1106',
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable teacher about Vancouver\'s history, geography, culture, zoology, and more. While making the answer educational but not too long, answer the following question:'
          },
          {
            role: 'user',
            content: question
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    const answer = response.data.choices[0].message.content.trim();
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch answer' });
  }
  
};
