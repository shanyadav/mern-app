'use strict';

const util = require('util');

/**
 * The module used as a template for building Precondition Failed Error
 *
 * @param {string} message - some error message
 * @param {string} originalError - Original Error
 * @param {String} code - Replace the error code of the error object
 *
 * @module PreconditionFailedError
 */
module.exports = function PreconditionFailedError(message, originalError, code) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }

  if (originalError) {
    this.originalError = originalError;
  }

  if (code === undefined) {
    code = 'PRECONDITION_FAILED';
  }

  this.name = this.constructor.name;
  this.code = code;
  this.message = message;
  this.status = 412;
};

util.inherits(module.exports, Error);