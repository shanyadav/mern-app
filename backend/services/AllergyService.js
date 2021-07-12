"use strict";

const _ = require("lodash");
const async = require("async");
const { Allergy } = require("../models");
const { QueryHelper } = require("../helpers/bts-query-utils");
const {
  ValidationError,
  RuntimeError,
  ResourceNotFoundError,
} = require("../helpers/bts-error-utils");

/**
 * Creates an instance of allergy service
 */
class AllergyService {
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Creates a new allergy
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  createAllergy(swaggerParams, res, next) {
    let allergy = swaggerParams.allergy.value;
    let allergyDetails = new Allergy({
      name: allergy.name,
      is_deleted: allergy.is_deleted,
    });
    CheckAllergy(
      { name: allergy.name },
      (checkError, checkResult) => {
        if (checkError) {
          return next(checkError);
        }
        if (!_.isEmpty(checkResult)) {
          let validationErrorObj = new ValidationError(
            "The allergy with name " + allergy.name + " already exists"
          );
          return next(validationErrorObj);
        }
        allergyDetails.save((saveError, saveRecord) => {
          if (saveError) {
            let runtimeError = new RuntimeError(
              "There was an error while creating a new allergy",
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
   * Get all allergies
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getAllergyList(swaggerParams, res, next) {
    let query = QueryHelper.getQuery(swaggerParams);
    Allergy.find(query, (findError, findRecords) => {
      res.setHeader("Content-Type", "application/json");
      if (findError) {
        let runtimeError = new RuntimeError(
          "There was an error while fetching all allergies",
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
   * Gets allergy details of given allergy_id
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getAllergy(swaggerParams, res, next) {
    let allergyId = swaggerParams.allergy_id.value;
    CheckAllergy(
      { _id: allergyId },
      (checkError, checkResult) => {
        if (checkError) {
          return next(checkError);
        }
        if (_.isEmpty(checkResult)) {
          let resourceNotFoundOErrorObj = new ResourceNotFoundError(
            "The allergy with id " + allergyId + " does not exists"
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
   * Updates allergy details of given allergy_id
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  updateAllergy(swaggerParams, res, next) {
    let allergyId = swaggerParams.allergy_id.value;
    let allergy = swaggerParams.allergy.value;
    async.parallel(
      [
        (cb) => {
          CheckAllergy({ _id: allergyId }, (checkError, checkResult) => {
              if (checkError) {
                return cb(checkError);
              }
              if (_.isEmpty(checkResult)) {
                let resourceNotFoundOErrorObj = new ResourceNotFoundError(
                  "The allergy with id " + allergyId + " does not exists"
                );
                return cb(resourceNotFoundOErrorObj);
              }
              return cb(null, checkResult);
            }
          );
        },
        (cb) => {
          if (allergy.name) {
            let allergyName = _.trim(allergy.name);
            Allergy.findOne(
              {
                name: { $regex: new RegExp("^" + allergyName, "i") },
                _id: { $ne: allergyId },
              },
              (nameFindError, nameRecord) => {
                if (nameFindError) {
                  let runtimeError = new RuntimeError(
                    "There was an error while fetching allergy with name " +
                      allergyName,
                    nameFindError
                  );
                  return cb(runtimeError);
                }
                if (!_.isEmpty(nameRecord)) {
                  let validationErrorObj = new ValidationError(
                    "The allergy with allergy name " +
                      allergyName +
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
        let allergyRecord = result[0];
        allergyRecord.name = allergy.name ? allergy.name : allergyRecord.name;
        allergyRecord.is_deleted = allergy.is_deleted != undefined ? allergy.is_deleted : allergyRecord.is_deleted;
        allergyRecord.save((saveError, saveAllergy) => {
          if (saveError) {
            let runtimeError = new RuntimeError(
              "There was an error while updating a allergy",
              saveError
            );
            return next(runtimeError);
          }
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          res.end(JSON.stringify(saveAllergy));
        });
      }
    );
  }
}

/**
 * Checks for allergy existence
 *
 * @param {Object} query - The user findOne query
 * @param {function} callback - The callback used to pass control to the next action/middleware
 *
 * @private
 */
function CheckAllergy(query, callback) {
  Allergy.findOne(query).exec((findOneError, findRecord) => {
    if (findOneError) {
      let runtimeErrorObj = new RuntimeError(
        "There was an error while finding allergy",
        findOneError
      );
      return callback(runtimeErrorObj);
    }
    return callback(null, findRecord);
  });
}

module.exports = AllergyService;
