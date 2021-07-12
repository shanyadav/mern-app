'use strict';

const util = require('util');

/**
 * The module used as a template for building Resource Not Found errors
 *
 * @module ResourceNotFoundError
 */
module.exports = function ResourceNotFound(message, code, originalError) {
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
  this.code = 'RESOURCE_NOT_FOUND';
  this.message = message;
  this.status = 404;

  if (code != null) {
    this.exceptionCode = code;
  }
};

util.inherits(module.exports, Error);
