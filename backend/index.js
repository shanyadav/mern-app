'use strict';

const app = require('connect')();
const http = require('http');
const swaggerTools = require('swagger-tools');
const jsyaml = require('js-yaml');
const fs = require('fs');
const config = require('config');
const bodyParser = require('body-parser');
const Logger = require('./helpers/logger-helper');
Logger.setup(config.logger);
const BtsErrorUtils = require('./helpers/bts-error-utils');
const {ErrorHandler, RuntimeError} = require('./helpers/bts-error-utils');
const JWTSecurityHelper = require('./helpers/JWTSecurityHelper');
const _ = require('lodash');
const cors = require('cors');
const serverPort = (process.env.PORT) ? process.env.PORT: config.get('server.port');
const mongoose = require('mongoose');
const JobHelper = require('./helpers/JobsHelper');
mongoose.plugin((schema) => { schema.options.usePushEach = true; });
mongoose.Promise = global.Promise;
// Allow any calls on /docs and /api-docs
const allowedRegex = '^(/v1)?/docs.*|^(/v1)?/api-docs.*|^/favicon.ico$';
const options = {
  swaggerUi: '/swagger.json',
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};
const errorHandlerConfig = {
  client_errors: config.get('client_errors')
};
BtsErrorUtils.configure(errorHandlerConfig);
mongoose.connect(config.mongo.database_host, config.mongo.options);

mongoose.connection.on(
  'error',
  function mongooseConnection(error) {
    let loggerContext = Logger.getContext('startup');
    loggerContext.crit('MongoDB connection error', error);
    process.exit(1);
  }
);

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
// eslint-disable-next-line no-sync
const spec = fs.readFileSync('./api/swagger.yaml', 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);
app.use(cors());
app.use(bodyParser.json());

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function middleWareFunc(middleware) {

  app.use(function initUse(req, res, next) {
    let loggerContext = null;
    if (!_.isEmpty(req.headers) && !_.isEmpty(req.headers['x-request-id'])) {
      loggerContext = Logger.getContext(req.headers['x-request-id']);
    } else {
      loggerContext = Logger.getContext();
    }
    // Strip off the query params to keep log message to minimum
    let hookLocation = req.url.indexOf('?');
    let logMessage = req.method + ' request started for: ';
    logMessage += (hookLocation == -1) ? req.url : req.url.substring(0, hookLocation);

    loggerContext.info(logMessage, {
      method: req.method,
      url: req.url
    });
    req.Logger = loggerContext;
    next();
  });

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  let securityMetaData = {};
  app.use(function configureAuditorContext(req, res, next) {
    // Allow the docs to load
    if (req.url.match(allowedRegex) || (!_.isEmpty(req.swagger.operation) && req.swagger.operation['x-public-operation'] === true)) {
      return next();
    }
    let jwtToken = req.headers['x-request-jwt'];
    if (!jwtToken) {
      return next(
        new RuntimeError('Missing required JWT header')
      );
    }
    // Allow admin for blog apis
    if (req.swagger.operation['x-blog-api'] === true) {
      return JWTSecurityHelper.checkBlogRole(req, jwtToken, config.keys.jwt_secret_key, next);
    }

    // Restrict block user to use specific functionality
    if (req.swagger.operation['x-user-restriction'] === true) {
      return JWTSecurityHelper.manageBlockUser(req, jwtToken, config.keys.jwt_secret_key, next);
    }

    if (_.isEmpty(req.swagger.operation)) { // operation not supported, lets return.swagger will handle with 405.
      return next();
    }
    next();
  });

  // Modifying the middleware swagger security, to cater for jwt verification
  securityMetaData.jwt = function validateJWT(req, def, token, next) {
    return JWTSecurityHelper.jwtVerification(req, token, config.keys.jwt_secret_key, next);
  };
  // Set the methods that should be used for swagger security
  app.use(middleware.swaggerSecurity(securityMetaData));
  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));
  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi(config.get('swagger_ui_config')));
  app.use(function errorHandler(err, req, res, next) {
    ErrorHandler.onError(err, req, res, next, errorHandlerConfig);
  });
  JobHelper.registerJobs(Logger.getContext());
  // Start the server
  http.createServer(app).listen(serverPort, function createFunc() {
    // eslint-disable-next-line no-console
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    // eslint-disable-next-line no-console
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });
});
