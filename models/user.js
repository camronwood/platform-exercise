const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

// create a sequelize instance
const sequelize = new Sequelize('fender_auth', 'postgres', 'admin', { dialect: 'postgres' });

// User Model
const User = sequelize.define('users', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
},
{
  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync();
      // eslint-disable-next-line no-param-reassign
      user.password = bcrypt.hashSync(user.password, salt);
    },
  },
});

// export User model for use in other files.
module.exports = User;
