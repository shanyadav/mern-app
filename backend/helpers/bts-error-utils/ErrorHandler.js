'use strict';

const ServerError = require('./ServerError');
const RuntimeError = require('./RuntimeError');
const _ = require('lodash');
let configuration = null;
const logLevels = [
  'info',
  'crit',
  'error',
  'warning',
  'notice',
  'debug',
  'emerg',
  'alert'
];
/**
 * The module used for building and formatting the applications http error responses
 *
 * @module ErrorHandler
 */
module.exports = {

  /**
   * This builds up a new error using the passed in validation error object.
   *
   * This creates a uniform structure for all our validation error responses
   *
   * @param {Error} error - The error object that will be prepared for display
   * @param {ClientRequest} request - The http request object
   * @param {IncomingMessage} response - The http response object
   * @param {function} next The callback used to pass control to the next action/middleware
   */
  onError: function onError(error, request, response, next) {
    if (!request.Logger) {
      throw new RuntimeError('The Logger is not set on the request');
    }
    if (error.status) {
      error = _prepareError(error, response, error.status);

    } else if (response.statusCode) {
      error = _prepareError(error, response, response.statusCode);
    } else {
      // this means that it is not a validation or customs error so it has to be an internal server error
      error = _prepareServerErrorForDisplay(error, response);
    }

    let logging = request.Logger;
    let logLevel = (configuration.client_errors[response.statusCode] &&
      configuration.client_errors[response.statusCode].log_level) ||
      logging.logLevels.ERROR;

    if (error.originalError) {
      let logError = {};
      logError['original'] = error.originalError;
      delete error.originalError;
      logError['error'] = error;

      logging.logAction(logLevel, 'An error occurred', logError);
    } else {
      logging.logAction(logLevel, 'An error occurred', error);
    }

    let displayError = _prepareDisplayErrorPerEnvironment(error);

    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(displayError));
  },

  /**
   * This will determine which config to use when building up this error.
   *
   * @private
   *
   * @param {Object} config - The config
   *
   * @returns {Object} The config
   */
  configure(config) {
    configuration = _setDefaultOrValidateConfig(config);
  }
};

/**
 * This builds up a new error using the passed in error object.
 *
 * Here we can override the code for different error types
 *
 * @private
 *
 * @param {Error} error - The error object that will be prepared for display
 * @param {IncomingMessage} response - The http response object
 * @param {Number} statusCode - The status code which will be used to determine the type of the error
 *
 * @returns {Error} The error that has been prepared for display
 */
function _prepareError(error, response, statusCode) {
  let config = configuration;
  // This is to change the status code to 406 since it has been incorrectly set to 400 by the bts-error-utils we are using
  if (!_.isNil(error.message) && error.message.indexOf('Invalid content type') >= 0) {
    statusCode = 406;
  }
  if (config['client_errors'] && config['client_errors'].hasOwnProperty(statusCode)) {
    if (!_.isNil(config['client_errors'][statusCode].error_code)) {
      error.code = config['client_errors'][statusCode].error_code;
      error = _prepareClientErrorForDisplay(error);
      response.statusCode = statusCode;
    } else {
      error = _prepareClientErrorForDisplay(error);
      response.statusCode = statusCode;
    }
    return error;
  }

  if (config['server_errors'] && Array.isArray(config['server_errors'])) {
    if (config['server_errors'].indexOf(statusCode) !== -1) {
      error = _prepareServerErrorForDisplay(error, response, statusCode);
    } else {
      error = _prepareServerErrorForDisplay(error, response);
    }
  }
  return error;
}

/**
 * This builds up a new Client side error using the passed in error object.
 *
 * @private
 *
 * @param {Error} error - The error object that will be prepared for display
 *
 * @returns {Object} The error that has been prepared for display
 */
function _prepareClientErrorForDisplay(error) {
  let errForDisplay = {};
  if (error.code) {
    errForDisplay.code = error.code;
  } else {
    errForDisplay.code = 'VALIDATION_ERROR';
  }

  if (error.message) {
    errForDisplay.message = error.message;
  }
  if (error.results) {
    errForDisplay.errors = error.results.errors;
  }
  if (error.exceptionCode) {
    errForDisplay.exceptionCode = error.exceptionCode;
  }
  return errForDisplay;
}

/**
 * This builds up a new Server side error using the passed in error object.
 *
 * @private
 *
 * @param {Error} error - The error object that will be prepared for display
 * @param {IncomingMessage} response - The http response object
 * @param {Number} statusCode - The status code
 *
 * @returns {Object} The error that has been prepared for display
 */
function _prepareServerErrorForDisplay(error, response, statusCode) {
  if (statusCode) {
    response.statusCode = statusCode;
  } else {
    response.statusCode = 500;
  }
  return new ServerError(error, error.originalError);
}

/**
 * This will validate the config or set the default config.
 *
 * @private
 *
 * @param {Object} config - The config
 *
 *
 * @returns {Object} The config
 */
function _setDefaultOrValidateConfig(config) {
  let _clonedConfig = _.cloneDeep(config);
  let clientErrors = {
    '400': {'error_code': null, 'log_level': 'error'},
    '401': {'error_code': 'UNAUTHORIZED', 'log_level': 'error'},
    '403': {'error_code': 'PERMISSION_DENIED', 'log_level': 'error'},
    '404': {'error_code': 'RESOURCE_NOT_FOUND', 'log_level': 'error'},
    '405': {'error_code': 'METHOD_NOT_SUPPORTED', 'log_level': 'error'},
    '406': {'error_code': 'CONTENT_TYPE_NOT_SUPPORTED', 'log_level': 'error'},
    '409': {'error_code': null, 'log_level': 'error'},
    '412': {'error_code': 'PRECONDITION_FAILED', 'log_level': 'error'},
    '413': {'error_code': null, 'log_level': 'error'}
  };
  let serverErrors = [504, 502, 500];

  if (_.isEmpty(_clonedConfig)) {
    _clonedConfig.client_errors = clientErrors;
    _clonedConfig.server_errors = serverErrors;
    return _clonedConfig;
  }

  if (_.isEmpty(_clonedConfig.client_errors)) {
    _clonedConfig.client_errors = clientErrors;
  }

  if (!_.isEmpty(_clonedConfig.client_errors)) {
    let invaildConfigErrors = [];
    _.forOwn(_clonedConfig.client_errors, (value, key) => {
      if (_.isString(_clonedConfig.client_errors[key])||
        _clonedConfig.client_errors[key] === null) {

        _clonedConfig.client_errors[key] = {'error_code': _clonedConfig.client_errors[key], 'log_level': 'error'};
      }
      if (_.isObject(_clonedConfig.client_errors[key]) &&
        !_.has(_clonedConfig.client_errors[key], 'error_code')) {

        _clonedConfig.client_errors[key]['error_code'] = null;
      }
      if (_.isObject(_clonedConfig.client_errors[key]) &&
        _.isEmpty(_clonedConfig.client_errors[key]['log_level'])) {

        _clonedConfig.client_errors[key]['log_level'] = 'error';
      }
      if (!_.includes(logLevels, _clonedConfig.client_errors[key]['log_level'])) {
        let error = {
          message: 'Invalid log level found for ' + key + ' in client errors',
          path: ['config', 'client_errors', key, 'log_level']
        };
        invaildConfigErrors.push(error);
      }
    });
    if (!_.isEmpty(invaildConfigErrors)) {
      throw new RuntimeError('The Invalid configuration has been set', invaildConfigErrors);
    }
  }

  if (_.isEmpty(_clonedConfig.server_errors)) {
    _clonedConfig.server_errors = serverErrors;
  }

  return _clonedConfig;
}

/**
 * This will remove properties from the error objects according to whether we allow debug properties or not based
 * on the environmental configuration.
 *
 * @param {object} error - The error that needs to be checked.

 * @private
 *
 * @returns {object} The checked error.
 */
function _prepareDisplayErrorPerEnvironment(error) {
  let config = configuration;
  // Remove the stack if it is there and debug is false.
  if (!config.bDebug && error.stack) {
    delete error.stack;
  }
  if (!config.bDebug && !_.isNil(error.stackTrace)) {
    delete error.stackTrace;
  }

  return error;
}