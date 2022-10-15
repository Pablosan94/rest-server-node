require('dotenv').config();

const express = require('express');
const server = express();

server.use('/', (req, res) => {
  res.send('Hello World');
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
