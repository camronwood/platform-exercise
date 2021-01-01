// This class is intended to handle errors in a consistant way.
class ErrorResponse extends Error {
  constructor({
    message = 'Bad Request!', status = 400, code = 'bad_request', logger = null,
  } = {}, ...params) {
    super(...params);

    this.message = message;
    this.status = status;
    this.code = code;

    this.meta = {
      dateTime: new Date(),
    };

    if (logger && logger.error) {
      logger.error(this);
    }
  }
}

module.exports = ErrorResponse;
