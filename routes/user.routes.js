const { Router } = require('express');
const { check } = require('express-validator');
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');
const userValidation = require('../middlewares/user.validation');
const {
  emailExists,
  isRoleValid,
  userIdExists,
} = require('../helpers/db-validators');

const router = Router();

router.get('/:id', getUser);

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid or missing').isEmail().not().isEmpty(),
    check('email').custom(emailExists),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password needs 6 characters at minimum').isLength({
      min: 6,
    }),
    check('role').custom(isRoleValid),
    userValidation,
  ],
  createUser
);

router.patch(
  '/:id',
  [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(userIdExists),
    check('role').custom(isRoleValid),
    userValidation,
  ],
  updateUser
);

router.delete(
  '/:id',
  [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(userIdExists),
    userValidation,
  ],
  deleteUser
);

module.exports = router;
