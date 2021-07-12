'use strict';

const util = require('util');

/**
 * The module used as a template for building server errors
 *
 *
 * @module ServerError
 */
module.exports = function ServerError(err, originalError) {
  Error.call(this);
  this.code = 'INTERNAL_SERVER_ERROR';
  let errorMessage = 'Server encountered an internal error and was unable to complete your request';

  if (originalError) {
    this.originalError = originalError;
  }

  if (err.message !== undefined) {
    errorMessage = err.message;
  }
  this.message = errorMessage;

  if (err.stack !== undefined) {
    this.stack = err.stack;
  }
};

util.inherits(module.exports, Error);
