const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing ?url= parameter');

  try {
    const decoded = decodeURIComponent(targetUrl);
    const response = await axios.get(decoded, {
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://kasintvlivecricket.com'
      }
    });

    res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).send('Proxy error: ' + err.message);
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
