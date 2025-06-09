const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const notes = await Notification.find({ recipient: req.user })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('sender', 'username avatar');
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markRead = async (req, res) => {
  try {
    const note = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
