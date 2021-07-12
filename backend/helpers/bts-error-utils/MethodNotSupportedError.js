'use strict';

const util = require('util');

/**
 * The module used as a template for building Method Not Supported Errors
 *
 * @module MethodNotSupportedError
 */
module.exports = function MethodNotSupportedError(message, originalError) {
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
  this.code = 'METHOD_NOT_SUPPORTED';
  this.message = message;
  this.status = 405;
};

util.inherits(module.exports, Error);
