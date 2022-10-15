const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.server = express();
    this.port = process.env.EXPRESS_PORT;
    this.userPath = '/api/user';

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
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
    this.server.use(this.userPath, require('../routes/user.routes'));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
