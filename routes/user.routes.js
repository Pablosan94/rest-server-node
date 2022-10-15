const { Router } = require('express');
const {
  getUser,
  getUsers,
  createUser,
  updateFullUser,
  updatePartialUser,
  deleteUser,
} = require('../controllers/user.controller');

const router = Router();

router.get('/:id', getUser);

router.get('/', getUsers);

router.post('/', createUser);

router.put('/:id', updateFullUser);

router.patch('/:id', updatePartialUser);

router.delete('/:id', deleteUser);

module.exports = router;
