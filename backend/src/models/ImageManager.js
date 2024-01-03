const AbstractManager = require("./AbstractManager");

class ImageManager extends AbstractManager {
  constructor() {
    super({ table: "images" });
  }

  deleteImage(announceId) {
    return this.database.query(`DELETE FROM images WHERE announce_id = ?`, [
      announceId,
    ]);
  }
}

module.exports = ImageManager;
