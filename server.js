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
  comment.replies = [];
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

app.delete('/comments/:commentIndex/replies/:replyIndex', (req, res) => {
  const commentIndex = parseInt(req.params.commentIndex);
  const replyIndex = parseInt(req.params.replyIndex);
  if (commentIndex >= 0 && commentIndex < comments.length) {
    const comment = comments[commentIndex];
    if (replyIndex >= 0 && replyIndex < comment.replies.length) {
      comment.replies.splice(replyIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).send('Reply not found');
    }
  } else {
    res.status(404).send('Comment not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
