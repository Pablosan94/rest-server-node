const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'User not found',
      });
    }

    if (!user.enabled) {
      return res.status(400).json({
        msg: 'User is not enabled',
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Incorrect Password',
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Unexpected error',
    });
  }
};

const googleLogin = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = User.findOne({ email });
    if (!user) {
      const data = {
        name,
        email,
        password: 'pwd',
        img: picture,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.enabled) {
      return res.status(401).json({
        msg: 'User is disabled',
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: 'Token could not be verified',
    });
  }
};

module.exports = { login, googleLogin };
