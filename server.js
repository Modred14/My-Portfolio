const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let comments = [];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.status(201).json(comment);
});

app.delete('/comments/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < comments.length) {
    comments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Comment not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});