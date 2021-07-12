"use strict";

const _ = require("lodash");
const async = require("async");
const { Calorie } = require("../models");
const { QueryHelper } = require("../helpers/bts-query-utils");
const {
  ValidationError,
  RuntimeError,
  ResourceNotFoundError,
} = require("../helpers/bts-error-utils");

/**
 * Creates an instance of calorie service
 */
class CalorieService {
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Creates a new calorie
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  createCalorie(swaggerParams, res, next) {
    let calorie = swaggerParams.calorie.value;
    let calorieDetails = new Calorie({
      name: calorie.name,
      is_deleted: calorie.is_deleted,
    });
    CheckCalorie(
      { name: calorie.name },
      (checkError, checkResult) => {
        if (checkError) {
          return next(checkError);
        }
        if (!_.isEmpty(checkResult)) {
          let validationErrorObj = new ValidationError(
            "The calorie with name " + calorie.name + " already exists"
          );
          return next(validationErrorObj);
        }
        calorieDetails.save((saveError, saveRecord) => {
          if (saveError) {
            let runtimeError = new RuntimeError(
              "There was an error while creating a new calorie",
              saveError
            );
            return next(runtimeError);
          }
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 201;
          res.end(JSON.stringify(saveRecord));
        });
      }
    );
  }

  /**
   * Get all calories
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getCalorieList(swaggerParams, res, next) {
    let query = QueryHelper.getQuery(swaggerParams);
    Calorie.find(query, (findError, findRecords) => {
      res.setHeader("Content-Type", "application/json");
      if (findError) {
        let runtimeError = new RuntimeError(
          "There was an error while fetching all calories",
          findError
        );
        return next(runtimeError);
      }
      if (_.isEmpty(findRecords)) {
        res.statusCode = 204;
        return res.end();
      }
      res.statusCode = 200;
      res.end(JSON.stringify(findRecords));
    });
  }

  /**
   * Gets calorie details of given calorie_id
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getCalorie(swaggerParams, res, next) {
    let calorieId = swaggerParams.calorie_id.value;
    CheckCalorie(
      { _id: calorieId },
      (checkError, checkResult) => {
        if (checkError) {
          return next(checkError);
        }
        if (_.isEmpty(checkResult)) {
          let resourceNotFoundOErrorObj = new ResourceNotFoundError(
            "The calorie with id " + calorieId + " does not exists"
          );
          return next(resourceNotFoundOErrorObj);
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(checkResult));
      }
    );
  }

  /**
   * Updates calorie details of given calorie_id
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  updateCalorie(swaggerParams, res, next) {
    let calorieId = swaggerParams.calorie_id.value;
    let calorie = swaggerParams.calorie.value;
    async.parallel(
      [
        (cb) => {
          CheckCalorie({ _id: calorieId }, (checkError, checkResult) => {
              if (checkError) {
                return cb(checkError);
              }
              if (_.isEmpty(checkResult)) {
                let resourceNotFoundOErrorObj = new ResourceNotFoundError(
                  "The calorie with id " + calorieId + " does not exists"
                );
                return cb(resourceNotFoundOErrorObj);
              }
              return cb(null, checkResult);
            }
          );
        },
        (cb) => {
          if (calorie.name) {
            let calorieName = _.trim(calorie.name);
            Calorie.findOne(
              {
                name: { $regex: new RegExp("^" + calorieName, "i") },
                _id: { $ne: calorieId },
              },
              (nameFindError, nameRecord) => {
                if (nameFindError) {
                  let runtimeError = new RuntimeError(
                    "There was an error while fetching calorie with name " +
                      calorieName,
                    nameFindError
                  );
                  return cb(runtimeError);
                }
                if (!_.isEmpty(nameRecord)) {
                  let validationErrorObj = new ValidationError(
                    "The calorie with calorie name " +
                      calorieName +
                      " already exist in the system"
                  );
                  return cb(validationErrorObj);
                }
                return cb();
              }
            );
          } else {
            return cb();
          }
        },
      ],
      (parallelError, result) => {
        if (parallelError) {
          return next(parallelError);
        }
        let calorieRecord = result[0];
        calorieRecord.name = calorie.name ? calorie.name : calorieRecord.name;
        calorieRecord.is_deleted = calorie.is_deleted != undefined ? calorie.is_deleted : calorieRecord.is_deleted;
        calorieRecord.save((saveError, saveRecord) => {
          if (saveError) {
            let runtimeError = new RuntimeError(
              "There was an error while updating a calorie",
              saveError
            );
            return next(runtimeError);
          }
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          res.end(JSON.stringify(saveRecord));
        });
      }
    );
  }
}

/**
 * Checks for calorie existence
 *
 * @param {Object} query - The user findOne query
 * @param {function} callback - The callback used to pass control to the next action/middleware
 *
 * @private
 */
function CheckCalorie(query, callback) {
  Calorie.findOne(query).exec((findOneError, findRecord) => {
    if (findOneError) {
      let runtimeErrorObj = new RuntimeError(
        "There was an error while finding calorie",
        findOneError
      );
      return callback(runtimeErrorObj);
    }
    return callback(null, findRecord);
  });
}

module.exports = CalorieService;
