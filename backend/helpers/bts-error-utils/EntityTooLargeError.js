'use strict';

const util = require('util');

/**
 * The module used as a template for building Entity Too Large errors
 *
 * @module EntityTooLargeError
 */
module.exports = function EntityTooLargeError(message, originalError) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }

  if (originalError) {
    this.originalError = originalError;
  }

  this.name = this.constructor.name;
  this.code = 'ENTITY_TOO_LARGE';
  this.message = message;
  this.status = 413;
};

util.inherits(module.exports, Error);
