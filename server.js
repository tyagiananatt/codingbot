const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize OpenAI client
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: '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',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'Coding Challenge Bot',
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ 
      error: true,
      reply: 'Prompt is required' 
    });
  }

  try {
    console.log('Sending request to OpenRouter API...');
    const completion = await openai.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        {
          role: 'system',
          content: 'You are a coding challenge generator and solution validator. You provide clear, detailed programming problems and analyze solutions effectively.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    console.log('Received response from OpenRouter API');
    
    if (completion.choices && completion.choices[0] && completion.choices[0].message) {
      res.json({ reply: completion.choices[0].message.content });
    } else {
      console.error('Invalid API response format:', completion);
      throw new Error('Invalid response format from API');
    }
  } catch (e) {
    console.error('API Error:', e);
    res.status(500).json({ 
      error: true,
      reply: `Error: ${e.message}. Please try again.` 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});
