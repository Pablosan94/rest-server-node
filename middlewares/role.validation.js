const { response } = require('express');

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.loggedUser) {
      return res.status(500).json({
        msg: 'Trying to verify role without checking JWT first',
      });
    }

    const { role } = req.loggedUser;

    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: `Endpoint requires one of these roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  hasRole,
};
