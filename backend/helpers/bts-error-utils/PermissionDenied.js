'use strict';

const util = require('util');

/**
 * Creates a Permission Denied Error
 *
 * @param {string} message Message to attach to the error.
 *
 * @module PermissionDenied
 */
module.exports = function PermissionDeniedError(message) {

  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }

  this.name = this.constructor.name;
  this.code = 'PERMISSION_DENIED';
  this.message = message;
  this.status = 403;

};

util.inherits(module.exports, Error);

