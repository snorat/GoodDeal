const AbstractManager = require("./AbstractManager");

class FavoriteManager extends AbstractManager {
  constructor() {
    super({ table: "favorite" });
  }

  insert(favorite) {
    return this.database.query(
      `INSERT INTO favorite (user_id, announce_id) VALUES (?, ?)`,
      [favorite.user_id, favorite.announce_id]
    );
  }

  favorisCheck(userId, announceId) {
    return this.database.query(
      `SELECT * FROM favorite WHERE user_id = ? AND announce_id = ?`,
      [userId, announceId]
    );
  }

  findAllFavoritesByUser(userId) {
    return this.database.query(
      `SELECT f.favorite_id, a.announce_id, a.title, b.car_brand_name, m.car_model_name, a.price, a.year, a.kilometer, a.motorisation, a.transmission, a.city, a.postalcode, i.image_1
      FROM favorite f
      JOIN announce a ON f.announce_id = a.announce_id
      JOIN car_brand b ON a.car_brand_id = b.car_brand_id 
      JOIN car_model m ON a.car_model_id = m.car_model_id
      JOIN images i ON a.announce_id = i.announce_id      
      WHERE f.user_id = ?`,
      [userId]
    );
  }

  deleteFavorite(userId, announceId) {
    return this.database.query(
      `DELETE FROM favorite WHERE user_id = ? AND announce_id = ?`,
      [userId, announceId]
    );
  }
}

module.exports = FavoriteManager;
