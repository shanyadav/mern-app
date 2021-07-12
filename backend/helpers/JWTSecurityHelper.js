'use strict';

const _ = require('lodash');
const config = require('config');
const JWT = require('jsonwebtoken');
const {User} = require('../models');
const {AuthorizationError, RuntimeError} = require('../helpers/bts-error-utils');

/**
 * This module contains methods that assists with swaggers security
 * and JWT verification.
 *
 * @module JWTSecurityHelper
 */
module.exports = {
  /**
   * Method to create and sign the JWT to be passed onto the downstream service
   *
   * @param {Object} tokenPayload - This is the payload to encode
   * @param {function} next - The callback with structure function(err)
   */
  signJWT: function signJWT(tokenPayload, next) {

    JWT.sign(tokenPayload, config.keys.jwt_secret_key, (err, signedToken) => {
      if (err) {
        let runtimeError =  new RuntimeError('There was an error while signing the jwt token');
        return next(runtimeError);
      }
      let authentication = {
        'token': signedToken
      };
      return next(null, authentication);
    });
  },
  /**
   * Verify the JWT token with the secret
   *
   * @param {object} req - The request object
   * @param {object} token - The token passed to the helper
   * @param {object} secret - The secret specified by the api
   * @param {function} next - The next callback with structure function(err)
   */
  jwtVerification: function jwtVerification(req, token, secret, next) {
    JWT.verify(token, secret, function validate(err, decoded) {
      if (err) {
        return next(new AuthorizationError('Invalid token specified'));
      }
      _.set(req, 'authentication.jwt.token', token);
      _.set(req, 'authentication.jwt.payload', decoded);
      return next();
    });
  },
  /**
   * Check the blog role from the JWT token
   *
   * @param {object} req - The request object
   * @param {object} token - The token passed to the helper
   * @param {object} secret - The secret specified by the api
   * @param {function} next - The next callback with structure function(err)
   */
  checkBlogRole: function checkBlogRole(req, token, secret, next) {
    JWT.verify(token, secret, function roleAuthentication(err, decoded) {
      if (err) {
        return next(new AuthorizationError('Invalid token specified'));
      }
      if (!_.isEqual(decoded.role, 'ADMIN')) {
        return next(new AuthorizationError('This api is only accessible for admin role'));
      }
      return next();
    });
  },
  /**
   * Check user status from the JWT token
   *
   * @param {object} req - The request object
   * @param {object} token - The token passed to the helper
   * @param {object} secret - The secret specified by the api
   * @param {function} next - The next callback with structure function(err)
   */
  manageBlockUser: function manageBlockUser(req, token, secret, next) {
    JWT.verify(token, secret, function roleAuthentication(err, decoded) {
      if (err) {
        return next(new AuthorizationError('Invalid token specified'));
      }
      User.findOne({_id: decoded.user_id})
        .select('-password')
        .exec((userFindOneError, userRecord) => {
          if (userFindOneError) {
            let runtimeErrorObj = new RuntimeError(
              'There was an error while checking block user',
              userFindOneError
            );
            return next(runtimeErrorObj);
          }
          if (userRecord.is_deleted === true) {
            return next(new AuthorizationError('You are no longer able to access this functionalities'));
          }
          return next();
        });
    });
  }
};