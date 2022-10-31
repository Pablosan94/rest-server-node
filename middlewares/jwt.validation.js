const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  console.log(token);

  if (!token) {
    return res.status(401).json({
      msg: 'Token missing',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const loggedUser = await User.findById(uid);

    if (!loggedUser) {
      return res.status(401).json({
        msg: 'User not found',
      });
    }

    if (loggedUser.enabled) {
      req.loggedUser = loggedUser;
      next();
    } else {
      return res.status(401).json({
        msg: 'Invalid token',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Invalid token',
    });
  }
};

module.exports = {
  validateJWT,
};
