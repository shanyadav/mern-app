'use strict';
const ErrorHandler = require('./ErrorHandler');
const AuthorizationError = require('./AuthorizationError');
const ConflictError = require('./ConflictError');
const MethodNotSupportedError = require('./MethodNotSupportedError');
const EntityTooLargeError = require('./EntityTooLargeError');
const ResourceNotFoundError = require('./ResourceNotFoundError');
const RuntimeError = require('./RuntimeError');
const ServerError = require('./ServerError');
const ValidationError = require('./ValidationError');
const PermissionDenied = require('./PermissionDenied');
const PreconditionFailedError = require('./PreconditionFailedError');

module.exports = {
  ErrorHandler: ErrorHandler,
  AuthorizationError: AuthorizationError,
  ConflictError: ConflictError,
  MethodNotSupportedError: MethodNotSupportedError,
  EntityTooLargeError: EntityTooLargeError,
  ResourceNotFoundError: ResourceNotFoundError,
  RuntimeError: RuntimeError,
  ServerError: ServerError,
  ValidationError: ValidationError,
  PermissionDenied: PermissionDenied,
  PreconditionFailedError: PreconditionFailedError,
  configure: ErrorHandler.configure
};