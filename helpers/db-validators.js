const User = require('../models/user');
const Role = require('../models/role');

const emailExists = async (email = '') => {
  const emailInDB = await User.findOne({ email });
  if (emailInDB) {
    throw new Error(`Email ${email} is already in use`);
  }
};

const isRoleValid = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role ${role} is not valid`);
  }
};

const userIdExists = async (id = '') => {
  const idInDB = await User.findById(id);
  if (!idInDB) {
    throw new Error(`ID ${id} does not exist`);
  }
};

module.exports = {
  emailExists,
  isRoleValid,
  userIdExists,
};
