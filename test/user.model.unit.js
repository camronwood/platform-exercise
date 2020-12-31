const { describe, it } = require('mocha');
const { expect } = require('chai');

const User = require('../models/user');

describe('Test User Model', () => {
  it('should return a new sqlized User object', () => {
    const user = new User();
    expect(user).to.have.keys(['dataValues', '_previousDataValues', '_changed', '_options', 'isNewRecord']);
    expect(user.isNewRecord).to.equal(true);
  });
});
