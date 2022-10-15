const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

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

const createUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'Email already in use',
    });
  }

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }

  res.json(user);
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
