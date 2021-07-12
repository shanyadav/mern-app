"use strict";

const _ = require("lodash");
const async = require("async");
const { Spice } = require("../models");
const { QueryHelper } = require("../helpers/bts-query-utils");
const {
  ValidationError,
  RuntimeError,
  ResourceNotFoundError,
} = require("../helpers/bts-error-utils");

/**
 * Creates an instance of spice service
 */
class SpiceService {
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Creates a new spice
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  createSpice(swaggerParams, res, next) {
    let spice = swaggerParams.spice.value;
    let spiceDetails = new Spice({
      name: spice.name,
      is_deleted: spice.is_deleted,
    });
    CheckSpice(
      { name: spice.name },
      (checkError, checkResult) => {
        if (checkError) {
          return next(checkError);
        }
        if (!_.isEmpty(checkResult)) {
          let validationErrorObj = new ValidationError(
            "The spice with name " + spice.name + " already exists"
          );
          return next(validationErrorObj);
        }
        spiceDetails.save((saveError, saveRecord) => {
          if (saveError) {
            let runtimeError = new RuntimeError(
              "There was an error while creating a new spice",
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
   * Get all spice levels
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getSpiceList(swaggerParams, res, next) {
    let query = QueryHelper.getQuery(swaggerParams);
    Spice.find(query, (findError, findRecords) => {
      res.setHeader("Content-Type", "application/json");
      if (findError) {
        let runtimeError = new RuntimeError(
          "There was an error while fetching all spice levels",
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
   * Gets spice details of given spice_id
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getSpice(swaggerParams, res, next) {
    let spiceId = swaggerParams.spice_id.value;
    CheckSpice(
      { _id: spiceId },
      (checkError, checkResult) => {
        if (checkError) {
          return next(checkError);
        }
        if (_.isEmpty(checkResult)) {
          let resourceNotFoundOErrorObj = new ResourceNotFoundError(
            "The spice with id " + spiceId + " does not exists"
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
   * Updates spice details of given spice_id
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  updateSpice(swaggerParams, res, next) {
    let spiceId = swaggerParams.spice_id.value;
    let spice = swaggerParams.spice.value;
    async.parallel(
      [
        (cb) => {
          CheckSpice({ _id: spiceId }, (checkError, checkResult) => {
              if (checkError) {
                return cb(checkError);
              }
              if (_.isEmpty(checkResult)) {
                let resourceNotFoundOErrorObj = new ResourceNotFoundError(
                  "The spice with id " + spiceId + " does not exists"
                );
                return cb(resourceNotFoundOErrorObj);
              }
              return cb(null, checkResult);
            }
          );
        },
        (cb) => {
          if (spice.name) {
            let spiceName = _.trim(spice.name);
            Spice.findOne(
              {
                name: { $regex: new RegExp("^" + spiceName, "i") },
                _id: { $ne: spiceId },
              },
              (nameFindError, nameRecord) => {
                if (nameFindError) {
                  let runtimeError = new RuntimeError(
                    "There was an error while fetching spice with name " +
                      spiceName,
                    nameFindError
                  );
                  return cb(runtimeError);
                }
                if (!_.isEmpty(nameRecord)) {
                  let validationErrorObj = new ValidationError(
                    "The spice with spice name " +
                      spiceName +
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
        let spiceRecord = result[0];
        spiceRecord.name = spice.name ? spice.name : spiceRecord.name;
        spiceRecord.is_deleted = spice.is_deleted != undefined ? spice.is_deleted : spiceRecord.is_deleted;
        spiceRecord.save((saveError, saveRecord) => {
          if (saveError) {
            let runtimeError = new RuntimeError(
              "There was an error while updating a spice",
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
 * Checks for spice existence
 *
 * @param {Object} query - The user findOne query
 * @param {function} callback - The callback used to pass control to the next action/middleware
 *
 * @private
 */
function CheckSpice(query, callback) {
  Spice.findOne(query).exec((findOneError, findRecord) => {
    if (findOneError) {
      let runtimeErrorObj = new RuntimeError(
        "There was an error while finding spice",
        findOneError
      );
      return callback(runtimeErrorObj);
    }
    return callback(null, findRecord);
  });
}

module.exports = SpiceService;
