'use strict';

const util = require('util');

/**
 * The module used as a template for building runtime errors
 *
 *
 * @module RuntimeError
 */
module.exports = function RuntimeError(message, originalError) {
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
  this.code = 'RUNTIME_ERROR';
  this.message = message;
  this.stackTrace = this.stack;
  this.status = 500;
};

util.inherits(module.exports, Error);
