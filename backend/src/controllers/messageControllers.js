const models = require("../models");

const sendMessageBetweenUsers = (req, res) => {
  const messages = req.body;

  models.message
    .sendMessage(messages)
    .then(() => {
      res.status(200).json({ message: "Message envoyé avec succès" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.errno,
      });
    });
};

const sendAutomaticMessage = (req, res) => {
  const messages = {
    announce_id: req.body.announce_id,
    sender_user_id: req.body.sender_user_id,
    receiver_user_id: req.body.receiver_user_id,
    content:
      "Bonjour, Je suis intéressé par votre vehicle. Est-il toujours disponible?",
  };
  models.message
    .sendMessage(messages)
    .then(() => {
      res.status(200).json({ message: "Message envoyé avec succès" });
    })
    .catch((err) => {
      res.status(401).send(err);
    });
};

const listUserMessage = (req, res) => {
  const { userId } = req.params;

  models.message
    .listConversations(userId)
    .then(([result]) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
};

const listMessagesBetweenUsers = (req, res) => {
  const { userId, receiverId, announceId } = req.params;

  models.message
    .listMessages(userId, receiverId, announceId)
    .then(([result]) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(401).json(err);
    });
};
const messageCheck = (req, res) => {
  const { userId, announceId } = req.params;
  models.message.msgCheck(userId, announceId).then(([rows]) => {
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      res.send(rows);
    }
  });
};

module.exports = {
  sendMessageBetweenUsers,
  listUserMessage,
  listMessagesBetweenUsers,
  sendAutomaticMessage,
  messageCheck,
};
