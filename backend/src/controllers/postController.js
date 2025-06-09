const Post = require('../models/Post');
const Notification = require('../models/Notification');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('user', 'username avatar');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { image, caption } = req.body;
    const post = await Post.create({ user: req.user, image, caption });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const index = post.likes.indexOf(req.user);
    if (index === -1) {
      post.likes.push(req.user);
      await Notification.create({ recipient: post.user, sender: req.user, type: 'like', post: post._id });
    } else {
      post.likes.splice(index, 1);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comment = { user: req.user, text: req.body.text };
    post.comments.push(comment);
    await Notification.create({ recipient: post.user, sender: req.user, type: 'comment', post: post._id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
