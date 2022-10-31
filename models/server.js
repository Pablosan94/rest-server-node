const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
  constructor() {
    this.server = express();
    this.port = process.env.EXPRESS_PORT;
    this.userPath = '/api/user';
    this.authPath = '/api/auth';

    // DB Connection
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.server.use(cors());

    // Body parsing
    this.server.use(express.json());

    // Static content serving
    this.server.use(express.static('public'));
  }

  routes() {
    this.server.use(this.authPath, require('../routes/auth.routes'));
    this.server.use(this.userPath, require('../routes/user.routes'));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
