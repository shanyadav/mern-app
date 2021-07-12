'use strict';

const AuthenticationService = require('../services/AuthenticationService');

/**
 * Creates a new user
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.userSignUp = function userSignUp(req, res, next) {
  let authenticationService = new AuthenticationService(req.Logger);
  authenticationService.userSignUp(req.swagger.params, res, next);
};

/**
 * User sign in
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.userSignIn = function userSignIn(req, res, next) {
  let authenticationService = new AuthenticationService(req.Logger);
  authenticationService.userSignIn(req.swagger.params, res, next);
};

/**
 * Verify an email
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
 module.exports.updateEmailStatus = function updateEmailStatus(req, res, next) {
  let authenticationService = new AuthenticationService(req.Logger);
  authenticationService.updateEmailStatus(req.swagger.params, res, next);
};