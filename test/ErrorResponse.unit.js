const { describe, it } = require('mocha');
const { expect } = require('chai');

const ErrorResponse = require('../errors/ErrorResponse');

describe('Test AuthError Class', () => {
  it('should return formatted ErrorResponse error object', () => {
    const errorResponse = new ErrorResponse();
    expect(errorResponse).to.have.keys(['message', 'status', 'code', 'meta']);
    expect(errorResponse.message).to.equal('Bad Request!');
    expect(errorResponse.status).to.equal(400);
    expect(errorResponse.code).to.equal('bad_request');
  });
});
