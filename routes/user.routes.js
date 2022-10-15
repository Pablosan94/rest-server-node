const { Router } = require('express');
const { check } = require('express-validator');
const {
  getUser,
  getUsers,
  createUser,
  updateFullUser,
  updatePartialUser,
  deleteUser,
} = require('../controllers/user.controller');
const userValidation = require('../middlewares/user.validation');
const Role = require('../models/role');

const router = Router();

router.get('/:id', getUser);

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid or missing').isEmail().not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password needs 6 characters at minimum').isLength({
      min: 6,
    }),
    check('role', 'Role is not valid').custom(async (role = '') => {
      const roleExists = await Role.findOne({ role });
      if (!roleExists) {
        throw new Error(`Role ${role} is not valid`);
      }
    }),
    userValidation,
  ],
  createUser
);

router.put('/:id', updateFullUser);

router.patch('/:id', updatePartialUser);

router.delete('/:id', deleteUser);

module.exports = router;
