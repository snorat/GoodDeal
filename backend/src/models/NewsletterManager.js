const AbstractManager = require("./AbstractManager");

class NewsletterManager extends AbstractManager {
  constructor() {
    super({ table: "newsletter" });
  }

  insert(newsletter) {
    return this.database.query(
      `insert into ${this.table} ( email) values (?)`,
      [newsletter.email]
    );
  }
}

module.exports = NewsletterManager;
