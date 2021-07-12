'use strict';

const CategoryService = require('../services/CategoryService');

/**
 * Created a new category
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.createCategory = function createCategory(req, res, next) {
  let categoryService = new CategoryService(req.Logger);
  categoryService.createCategory(req.swagger.params, res, next);
};

/**
 * Get all categories
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getCategoryList = function getCategoryList(req, res, next) {
  let categoryService = new CategoryService(req.Logger);
  categoryService.getCategoryList(req.swagger.params, res, next);
};

/**
 * Get category with given category_id
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getCategory = function getCategory(req, res, next) {
  let categoryService = new CategoryService(req.Logger);
  categoryService.getCategory(req.swagger.params, res, next);
};

/**
 * Update category with given category_id
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.updateCategory = function updateCategory(req, res, next) {
  let categoryService = new CategoryService(req.Logger);
  categoryService.updateCategory(req.swagger.params, res, next);
};