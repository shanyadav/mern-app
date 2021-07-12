"use strict";

const _ = require("lodash");
const async = require("async");
const { FoodType } = require("../models");
const { QueryHelper } = require("../helpers/bts-query-utils");
const {
  ValidationError,
  RuntimeError,
  ResourceNotFoundError,
} = require("../helpers/bts-error-utils");

/**
 * Creates an instance of food type service
 */
class FoodTypeService {
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Creates a new food type
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
   createFoodType(swaggerParams, res, next) {
    let foodTypeName = swaggerParams.food_type_name.value;
    let foodTypeIcon = swaggerParams.food_type_icon.value;
    let foodTypeDetails = new FoodType({
      name: foodTypeName,
      avatar_url: ''
    });
    CheckFoodType(
      { name: foodTypeName },
      (checkError, checkResult) => {
        if (checkError) {
          return next(checkError);
        }
        if (!_.isEmpty(checkResult)) {
          let validationErrorObj = new ValidationError(
            "The food type with name " +  foodTypeName + " already exists"
          );
          return next(validationErrorObj);
        }
        foodTypeDetails.save((saveError, saveRecord) => {
          if (saveError) {
            let runtimeError = new RuntimeError(
              "There was an error while creating a new food type",
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
   * Get all food types
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
   getFoodTypeList(swaggerParams, res, next) {
    let query = QueryHelper.getQuery(swaggerParams);
    FoodType.find(query, (findError, findRecords) => {
      res.setHeader("Content-Type", "application/json");
      if (findError) {
        let runtimeError = new RuntimeError(
          "There was an error while fetching all food types",
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
   * Gets food type details of given food_type_id
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
   getFoodType(swaggerParams, res, next) {
    let foodTypeId = swaggerParams.food_type_id.value;
    CheckFoodType(
      { _id: foodTypeId },
      (checkError, checkResult) => {
        if (checkError) {
          return next(checkError);
        }
        if (_.isEmpty(checkResult)) {
          let resourceNotFoundOErrorObj = new ResourceNotFoundError(
            "The food type with id " + foodTypeId + " does not exists"
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
   * Updates food type details of given food_type_id
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
   updateFoodType(swaggerParams, res, next) {
    let foodTypeId = swaggerParams.food_type_id.value;
    let foodTypeName = swaggerParams.food_type_name.value;
    let foodTypeIcon = swaggerParams.food_type_icon.value;
    async.parallel(
      [
        (cb) => {
          CheckFoodType({ _id: foodTypeId }, (checkError, checkResult) => {
              if (checkError) {
                return cb(checkError);
              }
              if (_.isEmpty(checkResult)) {
                let resourceNotFoundOErrorObj = new ResourceNotFoundError(
                  "The food type with id " + foodTypeId + " does not exists"
                );
                return cb(resourceNotFoundOErrorObj);
              }
              return cb(null, checkResult);
            }
          );
        },
        (cb) => {
          if (foodTypeName) {
            let foodName = _.trim(foodTypeName);
            FoodType.findOne(
              {
                name: { $regex: new RegExp("^" + foodName, "i") },
                _id: { $ne: foodTypeId },
              },
              (nameFindError, nameRecord) => {
                if (nameFindError) {
                  let runtimeError = new RuntimeError(
                    "There was an error while fetching food type with name " +
                      foodName,
                    nameFindError
                  );
                  return cb(runtimeError);
                }
                if (!_.isEmpty(nameRecord)) {
                  let validationErrorObj = new ValidationError(
                    "The food type with food type name " +
                      foodName +
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
        let typeRecord = result[0];
        let imgUrl = '';
        typeRecord.name = foodTypeName ? foodTypeName : typeRecord.name;
        typeRecord.avatar_url = imgUrl ? imgUrl : typeRecord.avatar_url;
        typeRecord.save((saveError, saveRecord) => {
          if (saveError) {
            let runtimeError = new RuntimeError(
              "There was an error while updating a food type",
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

   /**
   * Updates food type status of given food_type_id
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
    updateFoodTypeStatus(swaggerParams, res, next) {
      let foodTypeId = swaggerParams.food_type_id.value;
      let foodType = swaggerParams.foodType.value;
      CheckFoodType({ _id: foodTypeId }, (checkError, checkResult) => {
        if (checkError) {
          return next(checkError);
        }
        if (_.isEmpty(checkResult)) {
          let resourceNotFoundOErrorObj = new ResourceNotFoundError(
            "The food type with id " + foodTypeId + " does not exists"
          );
          return next(resourceNotFoundOErrorObj);
        }
        checkResult.is_deleted = foodType.is_deleted;
        checkResult.save((saveError, saveRecord) => {
          if (saveError) {
            let runtimeError = new RuntimeError(
              "There was an error while updating a food type status",
              saveError
            );
            return next(runtimeError);
          }
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          res.end(JSON.stringify(saveRecord));
        });
      });
  }
}

/**
 * Checks for food type existence
 *
 * @param {Object} query - The user findOne query
 * @param {function} callback - The callback used to pass control to the next action/middleware
 *
 * @private
 */
function CheckFoodType(query, callback) {
  FoodType.findOne(query).exec((findOneError, findRecord) => {
    if (findOneError) {
      let runtimeErrorObj = new RuntimeError(
        "There was an error while finding food type",
        findOneError
      );
      return callback(runtimeErrorObj);
    }
    return callback(null, findRecord);
  });
}

module.exports = FoodTypeService;
