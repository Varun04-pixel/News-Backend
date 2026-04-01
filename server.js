import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/'), async (req, res) => {
  const response = await fetch(`https://newsapi.org/v2/everything?q=tesla&pageSize=9&page=1&apiKey=${process.env.REACT_APP_API_KEY}`)
  const data = await response.json();
  res.json(data);
}

app.get('/api/news', async (req, res) => {
  try {
    const { category = 'general', page = 1, query } = req.query;

    let url;

    if (query) {
      url = `https://newsapi.org/v2/everything?q=${query}&pageSize=9&page=${page}&apiKey=${process.env.REACT_APP_API_KEY}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=9&page=${page}&apiKey=${process.env.REACT_APP_API_KEY}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});