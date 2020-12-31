const ErrorResponse = require('../errors/ErrorResponse');

const isLoggedIn = async (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    next();
  } else {
    res.status(401).json(
      new ErrorResponse({ message: 'Unautorized!', status: 401, code: 'unautorized' }),
    );
  }
};

module.exports = {
  isLoggedIn,
};
