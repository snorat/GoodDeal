const AbstractManager = require("./AbstractManager");

class MyannounceManager extends AbstractManager {
  constructor() {
    super({ table: "announce" });
  }

  myAnnounceCheck(userId, announceId) {
    return this.database.query(
      `SELECT * FROM announce WHERE user_id = ? AND announce_id = ?`,
      [userId, announceId]
    );
  }

  findImage(picture1, picture2, picture3, picture4, id) {
    return this.database.query(
      `SELECT * FROM images 
      WHERE announce_id = ?`,
      [picture1, picture2, picture3, picture4, id]
    );
  }
}

module.exports = MyannounceManager;
