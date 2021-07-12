'use strict';

var Winston = require('winston');
var uuid = require('uuid');
var _ = require('lodash');

var logger = null;
var stack = null;

/**
 * Logger class that encapsulates a winston logger and allows the creation of a logging context.
 */
class Logger {
  static setup(options) {

        // Set options to an empty object if it is not defined.
    if (!options) {
      options = {};
    }
    var transports = [
      new Winston.transports.Console({
        json: true,
        colorize: false,
        timestamp: true,
        stringify: options.pretty ? null : JSON.stringify,
        stderrLevels: ['emerg', 'alert', 'crit', 'error']
      })
    ];

    if (options.transports) {
      transports = [];
      let arrTransports = options.transports;
      arrTransports.forEach(function addTransport(transport) {
        transport.config.stringify = options.pretty ? null : JSON.stringify;
        switch (transport.type.toLowerCase()) {
          case 'console':
            transports.push(new Winston.transports.Console(transport.config));
            break;
          case 'file':
            transports.push(new Winston.transports.File(transport.config));
            break;
        }
      });
    }
    if (options.stack) {
      stack = options.stack;
    }
    logger = new Winston.Logger({
      level: options.level || 'info',
      levels: Winston.config.syslog.levels,
      transports: transports
    });

    _.forEach(logger.levels, function createContextShorthandFunctions(level, name) {
      LoggerContext.prototype[name] = function log(message, object, callback) {
        this.log(name, message, object, callback);
      };
    });
  }

  static flushLogger(callback) {
    logger.log('info', 'flush logger', stack, callback);
  }
  static getContext(requestId) {
    return new LoggerContext(requestId);
  }
}

class LoggerContext {
  constructor(requestId) {
    if (!requestId) {
      this.requestId = uuid.v4();
    } else {
      this.requestId = requestId;
    }
  }
  get logLevels() {
    return {
      INFO: 'info',
      CRITICAL: 'crit',
      ERROR: 'error',
      WARN: 'warning',
      NOTICE: 'notice',
      DEBUG: 'debug',
      EMERGENCY: 'emerg',
      ALERT: 'alert'
    };
  }

  logAction(level, message, objectOrCallback, callback) {
    this.log(level, message, objectOrCallback, callback);
  }

  log(level, message, objectOrCallback, callback) {
    var object = objectOrCallback;
    if (_.isFunction(objectOrCallback)) {
      callback = objectOrCallback;
      object = {};
    }

    if (_isError(object)) {
      object = parseError(object);
    } else if (object && _isError(object.error)) {
      object = _.extend({}, object, parseError(object.error));
      delete object.error;
    }

    var messageObject = _.extend({}, stack || {}, object);
    messageObject.requestId = this.requestId;

    if (callback) {
      logger.log(level, message, messageObject, callback);
    } else {
      logger.log(level, message, messageObject);
    }
  }
}

function _isError(object) {
  return object instanceof Error || (object && object.code && object.message);
}

function parseError(error) {
  let errorObject = {};

  if (error.originalError) {
    errorObject.original = parseErrorParts(error.originalError);
  }

  errorObject = parseErrorParts(error, errorObject);

  return errorObject;
}

function parseErrorParts(error, errorObject) {
  if (!errorObject) {
    errorObject = {};
  }

  if (!errorObject.code && error.code) {
    errorObject.errorCode = error.code;
  }
  // Attempt to retrieve the error message
  if (!errorObject.errorMessage && error.message) {
    errorObject.errorMessage = error.message;
  }

  // Transfer errors(Normally set on 400 validation errors)
  if (!errorObject.errors && error.errors) {
    errorObject.errors = error.errors;
  }

  // Attempt to retrieve the stack trace from the stack property
  if (!errorObject.errorStack && error.stack) {
    errorObject.errorStack = error.stack;
  }
  // If we could not retrieve the stack trace off of the stack property we try the stackTrace property
  if (!errorObject.errorStack && error.stackTrace) {
    errorObject.errorStack = error.stackTrace;
  }

  return errorObject;
}

module.exports = Logger;