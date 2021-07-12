'use strict';

const _ = require('lodash');
const async = require('async');
const {Category} = require('../models');
const {QueryHelper} = require('../helpers/bts-query-utils');
const {ValidationError, RuntimeError, ResourceNotFoundError} = require('../helpers/bts-error-utils');

/**
 * Creates an instance of category service
 */
class CategoryService {

  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Creates a new category
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  createCategory(swaggerParams, res, next) {
    let category = swaggerParams.category.value;
    let categoryDetails = new Category({
      'name': category.name,
      'description': category.description,
      'is_deleted': category.is_deleted
    });
    CheckCategory({name: { $regex: new RegExp("^" + category.name, "i") }}, (categoryCheckError, categoryCheckResult) => {
      if (categoryCheckError) {
        return next(categoryCheckError);
      }
      if (!_.isEmpty(categoryCheckResult)) {
        let validationErrorObj = new ValidationError(
            'The category with name ' + category.name + ' already exists'
        );
        return next(validationErrorObj);
      }
      categoryDetails.save((saveError, saveCategory) => {
        if (saveError) {
          let runtimeError = new RuntimeError(
            'There was an error while creating a new category',
            saveError
          );
          return next(runtimeError);
        }
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 201;
        res.end(JSON.stringify(saveCategory));
      });
    });
  }

  /**
   * Get all categories
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getCategoryList(swaggerParams, res, next) {
    let query = QueryHelper.getQuery(swaggerParams);
    Category.find(query, (categoryFindError, categoryRecords) => {
      res.setHeader('Content-Type', 'application/json');
      if (categoryFindError) {
        let runtimeError = new RuntimeError(
          'There was an error while fetching all categories',
          categoryFindError
        );
        return next(runtimeError);
      }
      if (_.isEmpty(categoryRecords)) {
        res.statusCode = 204;
        return res.end();
      }
      res.statusCode = 200;
      res.end(JSON.stringify(categoryRecords));
    });
  }

  /**
   * Gets category details of given category_id
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  getCategory(swaggerParams, res, next) {
    let categoryId = swaggerParams.category_id.value;
    CheckCategory({_id: categoryId}, (categoryCheckError, categoryCheckResult) => {
      if (categoryCheckError) {
        return next(categoryCheckError);
      }
      if (_.isEmpty(categoryCheckResult)) {
        let resourceNotFoundOErrorObj = new ResourceNotFoundError(
          "The category with id " + categoryId + " does not exists"
        );
        return next(resourceNotFoundOErrorObj);
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(categoryCheckResult));
    });
  }

  /**
   * Updates category details of given category_id
   *
   * @param {object} swaggerParams - The swagger parameter
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   */
  updateCategory(swaggerParams, res, next) {
  let categoryId = swaggerParams.category_id.value;
  let category = swaggerParams.category.value;
  async.parallel([
    (cb) => {
      CheckCategory({_id: categoryId}, (categoryCheckError, categoryCheckResult) => {
        if (categoryCheckError) {
          return cb(categoryCheckError);
        }
        if (_.isEmpty(categoryCheckResult)) {
          let resourceNotFoundOErrorObj = new ResourceNotFoundError(
            "The category with id " + categoryId + " does not exists"
          );
          return cb(resourceNotFoundOErrorObj);
        }
        return cb(null, categoryCheckResult);
      });
    },
    (cb) => {
      if (category.name) {
        let categoryName = _.trim(category.name);
        Category.findOne({
          'name': {$regex: new RegExp('^' + categoryName, 'i')},
          _id: {$ne: categoryId}
        }, (categoryNameFindError, categoryNameRecord) => {
          if (categoryNameFindError) {
            let runtimeError = new RuntimeError(
              'There was an error while fetching categories with name ' + categoryName,
              categoryNameFindError
            );
            return cb(runtimeError);
          }
          if (!_.isEmpty(categoryNameRecord)) {
            let validationErrorObj = new ValidationError(
              'The category with category name ' + categoryName + ' already exist in the system'
            );
            return cb(validationErrorObj);
          }
          return cb();
        });
      } else {
        return cb();
      }
    }
  ], (parallelError, result) => {
    if (parallelError) {
      return next(parallelError);
    }
    let categoryRecord = result[0];
    categoryRecord.name = category.name ? category.name : categoryRecord.name;
    categoryRecord.description = category.description ? category.description : categoryRecord.description;
    categoryRecord.is_deleted = category.is_deleted != undefined ? category.is_deleted : categoryRecord.is_deleted;
    categoryRecord.save((saveError, saveCategory) => {
      if (saveError) {
        let runtimeError = new RuntimeError(
          'There was an error while updating a category',
          saveError
        );
        return next(runtimeError);
      }
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(saveCategory));
    });
  });
  }
}

/**
 * Checks for category existence
 *
 * @param {Object} query - The user findOne query
 * @param {function} callback - The callback used to pass control to the next action/middleware
 *
 * @private
 */
function CheckCategory(query, callback) {
    Category.findOne(query)
      .exec((categoryFindOneError, categoryRecord) => {
        if (categoryFindOneError) {
          let runtimeErrorObj = new RuntimeError(
            'There was an error while finding category',
            categoryFindOneError
          );
          return callback(runtimeErrorObj);
        }
        return callback(null, categoryRecord);
      });
  }

  module.exports = CategoryService;