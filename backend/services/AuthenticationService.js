"use strict";

const fs = require("fs");
const _ = require("lodash");
const path = require("path");
const passwordHash = require("password-hash");
const { User } = require("../models");
const { sendMail } = require("../helpers/EmailHelper");
const JWTSecurityHelper = require("../helpers/JWTSecurityHelper");
const {QueryHelper} = require('../helpers/bts-query-utils');
const {
  ValidationError,
  RuntimeError,
  ConflictError,
} = require("../helpers/bts-error-utils");
const appDir = path.dirname(require.main.filename);

/**
 * Creates an instance of user authentication service
 */
class AuthenticationService {
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Creates a new user
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  userSignUp(swaggerParams, res, next) {
    let user = swaggerParams.user.value;
    let userEmail = user.email;
    let userName = user.name;
    let userDetails = new User({
      name: userName,
      email: userEmail,
      role: user.role,
      password: passwordHash.generate(user.password),
      is_email_verified: false,
      contact_number: user.contact_number,
    });
    CheckUser({ email: userEmail }, (userCheckError, userCheckResult) => {
      if (userCheckError) {
        return next(userCheckError);
      }
      if (!_.isEmpty(userCheckResult)) {
        if (userCheckResult.is_email_verified) {
          let validationErrorObj = new ValidationError(
            "Whoops!\n A user with that email address already exists!"
          );
          return next(validationErrorObj);
        }
        if (!userCheckResult.is_email_verified) {
          let conflictError = new ConflictError(
            "The account is not verified, please verify your account"
          );
          return next(conflictError);
        }
      }
      userDetails.save((saveError, saveUser) => {
        if (saveError) {
          let runtimeError = new RuntimeError(
            "There was an error while creating a new user",
            saveError
          );
          return next(runtimeError);
        }
        _sendVerificationMail(saveUser.email, (mailError) => {
          if (mailError) {
            let runtimeError = new RuntimeError(
              "There was an error while sending email verification mail to the registered user",
              mailError
            );
            return next(runtimeError);
          }
          let tokenPayload = {
            user_id: userDetails._id,
            email: userDetails.email,
            name: userDetails.name,
            role: userDetails.role,
          };
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 201;
          res.end(JSON.stringify(tokenPayload));
        });
      });
    });
  }

  /**
   * Creates a new user
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  userSignIn(swaggerParams, res, next) {
    let user = swaggerParams.user.value;
    let userEmail = user.email;
    let userPass = user.password;
    CheckUser(
      { email: userEmail, is_email_verified: true },
      (userCheckError, userCheckResult) => {
        if (userCheckError) {
          return next(userCheckError);
        }
        if (_.isEmpty(userCheckResult)) {
          let validationErrorObj = new ValidationError(
            "User with email " + userEmail + " does not exists!"
          );
          return next(validationErrorObj);
        } else if (!passwordHash.verify(userPass, userCheckResult.password)) {
          let validationErrorObj = new ValidationError("Incorrect password!");
          return next(validationErrorObj);
        }
        userCheckResult.last_login_at = new Date();
        userCheckResult.save((loginTimeUpdateError) => {
          if (loginTimeUpdateError) {
            let runtimeErrorObj = new RuntimeError(
              "There was an error while updating login time of user",
              loginTimeUpdateError
            );
            return next(runtimeErrorObj);
          }
          let tokenPayload = {
            user_id: userCheckResult._id,
            email: userCheckResult.email,
            name: userCheckResult.name,
            role: userCheckResult.role,
          };
          JWTSecurityHelper.signJWT(tokenPayload, (signError, signToken) => {
            if (signError) {
              return next(signError);
            }
            const userResult = _.extend(tokenPayload, signToken);
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(userResult));
          });
        });
      }
    );
  }

  /**
   * Verify an email
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  updateEmailStatus(swaggerParams, res, next) {
    let query = QueryHelper.getQuery(swaggerParams);
    let email = query.email_id;
    CheckUser({ email: email }, (userCheckError, userCheckResult) => {
      if (userCheckError) {
        return next(userCheckError);
      }
      if (_.isEmpty(userCheckResult)) {
        let validationErrorObj = new ValidationError(
          "The user with email " + email + " does not exists"
        );
        return next(validationErrorObj);
      }
      userCheckResult.is_email_verified = true;
      userCheckResult.save((updateUserError, updatedRecord) => {
        if (updateUserError) {
          let runtimeErrorObj = new RuntimeError(
            "There was an error while verifying user's email",
            updateUserError
          );
          return next(runtimeErrorObj);
        }
        _sendWelcomeMail(updatedRecord.name, updatedRecord.email, (mailError) => {
          if (mailError) {
            let runtimeError = new RuntimeError(
              'There was an error while sending welcome mail to the user',
              mailError
            );
            return next(runtimeError);
          }
          res.writeHead(301, {
            Location: "https://seedemo.co.uk/",
          });
          return res.end();
        });
      });
    });
  }
}

/**
 * Checks for user existence
 *
 * @param {Object} query - The user findOne query
 * @param {function} callback - The callback used to pass control to the next action/middleware
 *
 * @private
 */
function CheckUser(query, callback) {
  User.findOne(query).exec((userFindOneError, userRecord) => {
    if (userFindOneError) {
      let runtimeErrorObj = new RuntimeError(
        "There was an error while finding user",
        userFindOneError
      );
      return callback(runtimeErrorObj);
    }
    return callback(null, userRecord);
  });
}

/**
 * Send email verification mail to the user
 *
 * @param {String} emailId - The email-id of user to send mail
 * @param {function} callback - The callback used to pass control to the next action/middleware
 *
 * @private
 */
function _sendVerificationMail(emailId, callback) {
  let content;
  fs.readFile(
    appDir + "/mail-templates/EmailVerification.html",
    function read(err, data) {
      if (err) {
        let runtimeError = new RuntimeError(
          "There was an error while reading mail template file",
          err
        );
        return callback(runtimeError);
      }
      content = data.toString();
      let mapObj = {
        "#email": emailId,
        "#url": `http://localhost:3200/v1/update-email-status?email_id=${emailId}`,
      };
      content = content.replace(/#email|#url/gi, (matched) => {
        return mapObj[matched];
      });
      let options = {
        to: emailId,
        subject: "Please verify your email",
        html: content,
      };
      sendMail(options, callback);
    }
  );
}

/**
 * Send welcome email notification
 *
 * @param {String} username - The name of user
 * @param {String} emailId - The email-id of user to send mail
 * @param {function} callback - The callback used to pass control to the next action/middleware
 *
 * @private
 */
 function _sendWelcomeMail(username, emailId, callback) {
  let content;
  fs.readFile(appDir + '/mail-templates/WelcomeEmail.html', function read(err, data) {
    if (err) {
      let runtimeError = new RuntimeError(
        'There was an error while sending mail to the user',
        err
      );
      return callback(runtimeError);
    }
    content = data.toString();
    content = content.replace('#username', username);
    let options = {
      to: emailId,
      subject: 'Welcome to BTS!',
      html: content
    };
    sendMail(options, callback);
  });
}

module.exports = AuthenticationService;
