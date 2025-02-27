const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.udet(bodyParder());
app.use(bodyParser.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI(process.env.GEMINIAPI);

app.post('/gemini', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/ai', async (req, res) => {
  const prompt1 = req.body.prompt;

  if (!prompt1) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const r = await axios.post(`https://test-ai-ihc6.onrender.com/api`, {
      prompt: prompt1,
      apikey: "GayKey-oWHmMb1t8ASljhpgSSUI",
      name: "user",
      id: "4"
    });

    if (r.data.av) {
      res.set('Content-Type', 'application/octet-stream'); // Sesuaikan dengan tipe file
      res.send(r.data.av);
    } else {
      res.json({ result: r.data.result });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});