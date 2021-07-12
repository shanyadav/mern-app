'use strict';

const util = require('util');

/**
 * The module used as a template for building validation errors
 *
 * @module ValidationError
 */
module.exports = function ValidationError(message, errors, originalError) {
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
  this.code = 'MODEL_VALIDATION_FAILED';
  this.message = message;
  if (errors !== undefined) {
    this.results = {'errors': errors};
  }
  this.status = 400;
};

util.inherits(module.exports, Error);
