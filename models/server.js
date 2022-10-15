const express = require('express');

class Server {
  constructor() {
    this.server = express();
    this.port = process.env.PORT;

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    this.server.use(express.static('public'));
  }

  routes() {
    this.server.get('/api', (req, res) => {
      res.json({
        msg: 'get API',
      });
    });

    this.server.post('/api', (req, res) => {
      res.json({
        msg: 'post API',
      });
    });

    this.server.put('/api', (req, res) => {
      res.json({
        msg: 'put API',
      });
    });

    this.server.delete('/api', (req, res) => {
      res.json({
        msg: 'delete API',
      });
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
