const Chat = require("../models/Chat");

exports.fetchMessages = async (req, res) => {
  try {
    const messages = await Chat.find();
    if (messages.length === 0) {
      return res.status(404).json({ success: true, data: [] });
    }
    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, err: err });
  }
};
