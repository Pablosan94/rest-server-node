const { request, response } = require('express');

const getUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: 'get user - controller',
    id,
  });
};

const getUsers = (req = request, res = response) => {
  res.json({
    msg: 'get all users - controller',
  });
};

const createUser = (req = request, res = response) => {
  const { name, age } = req.body;

  res.json({
    msg: 'post user - controller',
    name,
    age,
  });
};

const updateFullUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: 'put user - controller',
    id,
  });
};

const updatePartialUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: 'patch user - controller',
    id,
  });
};

const deleteUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: 'delete user - controller',
    id,
  });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateFullUser,
  updatePartialUser,
  deleteUser,
};
