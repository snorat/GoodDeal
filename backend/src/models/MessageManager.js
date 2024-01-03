const AbstractManager = require("./AbstractManager");

class MessageManager extends AbstractManager {
  constructor() {
    super({ table: "messages" });
  }

  msgCheck(userId, announceId) {
    return this.database.query(
      `SELECT * FROM messages WHERE sender_user_id = ? AND announce_id = ?`,
      [userId, announceId]
    );
  }

  sendMessage(messages) {
    return this.database.query(
      `INSERT INTO ${this.table}  (announce_id, sender_user_id, receiver_user_id, content) VALUES (?, ?, ?, ?)`,
      [
        messages.announce_id,
        messages.sender_user_id,
        messages.receiver_user_id,
        messages.content,
      ]
    );
  }

  listConversations(userId) {
    return this.database.query(
      ` 
        SELECT
        other_user.user_id AS userId,
        other_user.email AS userEmail,
        other_user.firstname AS userFname,
        DATE_FORMAT(MAX(messages.timestamp), '%e %b') AS lastMessageTime,
        other_images.image_1 AS Image,
other_announce.title AS AnnTitle,
other_announce.price AS Price,
other_announce.announce_id AS AnnounceId
        FROM
        messages

        INNER JOIN
        images AS other_images ON other_images.announce_id=messages.announce_id
        INNER JOIN 
        announce AS other_announce ON other_announce.announce_id=messages.announce_id
        INNER JOIN
        user AS other_user ON other_user.user_id = messages.sender_user_id OR other_user.user_id = messages.receiver_user_id

        WHERE

        (messages.sender_user_id = ? OR messages.receiver_user_id = ?)
        AND other_user.user_id != ?
        GROUP BY other_user.user_id,other_images.image_1,other_announce.announce_id
        
        ORDER BY lastMessageTime DESC;
    `,
      [userId, userId, userId]
    );
  }

  listMessages(sender, receiver) {
    return this.database.query(
      `SELECT
        messages.*,
        sender.email AS sender_email,
        receiver.email AS receiver_email,
        title,
        price,
        image_1
        FROM
        messages
        JOIN 
        images ON images.announce_id = messages.announce_id
        JOIN
            user AS sender ON messages.sender_user_id = sender.user_id
        JOIN
            user AS receiver ON messages.receiver_user_id = receiver.user_id
            JOIN
            announce  ON announce.announce_id = messages.announce_id

        WHERE
        (messages.sender_user_id = ? AND messages.receiver_user_id = ?)
        OR (messages.sender_user_id = ? AND messages.receiver_user_id = ?)
        ORDER BY
         messages.timestamp ASC;
        `,
      [sender, receiver, receiver, sender]
    );
  }
}

module.exports = MessageManager;
