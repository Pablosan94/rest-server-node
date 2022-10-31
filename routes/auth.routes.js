const { Router } = require('express');
const { check } = require('express-validator');
const userValidation = require('../middlewares/user.validation');
const { login } = require('../controllers/auth.controller');

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

module.exports = router;
