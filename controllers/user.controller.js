const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { findByIdAndUpdate } = require('../models/user');

const getUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: 'get user - controller',
    id,
  });
};

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments({ enabled: true }),
    User.find({ enabled: true }).skip(parseInt(from)).limit(parseInt(limit)),
  ]);

  res.json({ total, users });
};

const createUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }

  res.json(user);
};

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...body } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    body.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, body);

  res.json(user);
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  // const user = await User.findByIdAndDelete(id);
  const user = await User.findByIdAndUpdate(id, { enabled: false });

  res.json(user);
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
