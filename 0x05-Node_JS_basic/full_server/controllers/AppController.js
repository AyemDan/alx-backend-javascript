class AppController {
  // Static method to handle the homepage route
  static getHomepage(req, res) {
    res.status(200).send('Hello Holberton School!');
  }
}

module.exports = AppController;
