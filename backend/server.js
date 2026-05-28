import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Base route to verify by displaying simple message on web page
app.get('/', (req, res) => {
  res.send('Server is running using Express.js successfully!');
});

// JSON endpoint for API checks
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the Express server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
