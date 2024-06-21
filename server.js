const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbUrl = process.env.DB_URL; 
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


const commentSchema = new mongoose.Schema({
  name: String,
  text: String,
});

const Comment = mongoose.model('Comment', commentSchema);

// API endpoints
app.get('/comments', async (req, res) => {
  const comments = await Comment.find();
  res.send(comments);
});

app.post('/comments', async (req, res) => {
  const { name, text } = req.body;
  const newComment = new Comment({ name, text });
  await newComment.save();
  res.send(newComment);
});

app.delete('/comments/:id', async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.send({ message: 'Comment deleted' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
