const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5001;

app.use(express.json());

app.get('/api/photos/:page', async (req, res) => {
  const { page } = req.params;
  try {
    const response = await axios.get(`https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
