'use strict';

const FoodTypeService = require('../services/FoodTypeService');

/**
 * Created a new food type
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.createFoodType = function createFoodType(req, res, next) {
  let foodTypeService = new FoodTypeService(req.Logger);
  foodTypeService.createFoodType(req.swagger.params, res, next);
};

/**
 * Get all food types
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getFoodTypeList = function getFoodTypeList(req, res, next) {
  let foodTypeService = new FoodTypeService(req.Logger);
  foodTypeService.getFoodTypeList(req.swagger.params, res, next);
};

/**
 * Get food type with given food_type_id
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getFoodType = function getFoodType(req, res, next) {
  let foodTypeService = new FoodTypeService(req.Logger);
  foodTypeService.getFoodType(req.swagger.params, res, next);
};

/**
 * Update food type with given food_type_id
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.updateFoodType = function updateFoodType(req, res, next) {
  let foodTypeService = new FoodTypeService(req.Logger);
  foodTypeService.updateFoodType(req.swagger.params, res, next);
};

/**
 * Update food type status with given food_type_id
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
 module.exports.updateFoodTypeStatus = function updateFoodTypeStatus(req, res, next) {
  let foodTypeService = new FoodTypeService(req.Logger);
  foodTypeService.updateFoodTypeStatus(req.swagger.params, res, next);
};