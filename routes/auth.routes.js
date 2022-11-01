const { Router } = require('express');
const { check } = require('express-validator');
const userValidation = require('../middlewares/user.validation');
const { login, googleLogin } = require('../controllers/auth.controller');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email is not valid or missing').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password needs 6 characters at minimum').isLength({
      min: 6,
    }),
    userValidation,
  ],
  login
);

router.post(
  '/google',
  [
    check('id_token', 'Google Token is required').not().isEmpty(),
    userValidation,
  ],
  googleLogin
);

module.exports = router;
