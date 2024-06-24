const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let comments = [];

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Post a new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comment.replies = []; // Initialize replies as an empty array
  comments.push(comment);
  res.status(201).json(comment);
});

// Delete a comment by index
app.delete('/comments/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < comments.length) {
    comments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Comment not found');
  }
});

// Post a reply to a comment
app.post('/comments/:index/replies', (req, res) => {
  const index = parseInt(req.params.index);
  const { name, text } = req.body;
  if (index >= 0 && index < comments.length) {
    const comment = comments[index];
    const reply = { name, text };
    comment.replies.push(reply);
    res.status(201).json(reply);
  } else {
    res.status(404).send('Comment not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

