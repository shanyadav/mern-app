'use strict';

const SubCategoryService = require('../services/SubCategoryService');

/**
 * Created a new sub-category
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.createSubCategory = function createSubCategory(req, res, next) {
  let subCategoryService = new SubCategoryService(req.Logger);
  subCategoryService.createSubCategory(req.swagger.params, res, next);
};

/**
 * Get list of sub-categories
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getSubCategoryList = function getSubCategoryList(req, res, next) {
  let subCategoryService = new SubCategoryService(req.Logger);
  subCategoryService.getSubCategoryList(req.swagger.params, res, next);
};

/**
 * Gets sub-category with given subCategory_id
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getSubCategory = function getSubCategory(req, res, next) {
  let subCategoryService = new SubCategoryService(req.Logger);
  subCategoryService.getSubCategory(req.swagger.params, res, next);
};

/**
 * Updates sub-category with given subCategory_id
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.updateSubCategory = function updateSubCategory(req, res, next) {
  let subCategoryService = new SubCategoryService(req.Logger);
  subCategoryService.updateSubCategory(req.swagger.params, res, next);
};