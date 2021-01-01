const bcrypt = require('bcrypt');
const User = require('./models/user');
const ErrorResponse = require('./errors/ErrorResponse');
const { isLoggedIn } = require('./middleware/session-management');

const routes = (router) => {
  // USER ROUTES
  router.post('/users/registration', (req, res) => {
    const { username, email, password } = req.body;

    // simple validation
    if (!username) {
      res.status(400).json(new ErrorResponse({ message: 'Username Required' }));
    }

    if (!email) {
      res.status(400).json(new ErrorResponse({ message: 'Email Required' }));
    }

    if (!password) {
      res.status(400).json(new ErrorResponse({ message: 'Password Required' }));
    }

    User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }).then((user) => {
      req.session.user = user.dataValues;
      res.status(200).json({ message: 'Registration Successful' });
    })
      .catch((e) => {
        // TODO: we would want to properly report / log errors from
        //  the database such as failed for unique constratints
        res.status(400).json(new ErrorResponse({ message: e.message }));
      });
  });

  router.post('/users/login', (req, res) => {
    const { email, password } = req.body;

    // simple validation
    if (!email) {
      res.status(400).json(new ErrorResponse({ message: 'Username Required' }));
    }

    if (!password) {
      res.status(400).json(new ErrorResponse({ message: 'Password Required' }));
    }

    User.findOne({ where: { email } }).then((user) => {
      if (!user) {
        res.status(401).json(new ErrorResponse({ message: 'User Not Found', status: 401, code: 'unautorized' }));
      } else if (!bcrypt.compareSync(password, user.password)) {
        res.status(401).json(new ErrorResponse({ message: 'Password not vaild', status: 401, code: 'unautorized' }));
      } else {
        req.session.user = user.dataValues;
        res.status(200).json({ message: 'Login Successful' });
      }
    });
  });

  router.get('/users/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
      res.status(200).json({ message: 'Logout Successful' });
    } else {
      res.status(500).json({ message: 'User is already logged out' });
    }
  });

  router.put('/users', isLoggedIn, (req, res) => {
    const { name } = req.body;

    // simple validation
    if (!name) {
      res.status(400).json(new ErrorResponse({ message: 'Nothing to update' }));
    }

    User.findOne({ where: { id: req.session.user.id } }).then((user) => {
      user.update({
        name: req.body.name,
      }).then(() => {
        res.status(200).json({ message: 'Update Successful' });
      }).catch(() => {
        res.status(500).json(new ErrorResponse({ message: 'Update Failed', status: 500, code: 'faild_updadting_user' }));
      });
    });
  });

  router.delete('/users', isLoggedIn, (req, res) => {
    User.findOne({ where: { id: req.session.user.id } }).then((user) => {
      user.destroy().then(() => {
        res.status(200).json({ message: 'Delete Successful' });
      }).catch(() => {
        res.status(500).json(new ErrorResponse({ message: 'Delete Failed', status: 500, code: 'faild_deleteing_user' }));
      });
    });
  });

  // Simple GET route to check the service is running
  router.get('/', (req, res) => {
    res.status(200).send('FENDER CODING CHALLANGE');
  });
};

module.exports = routes;
