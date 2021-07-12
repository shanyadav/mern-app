'use strict';

const CalorieService = require('../services/CalorieService');

/**
 * Created a new calorie
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.createCalorie = function createCalorie(req, res, next) {
  let calorieService = new CalorieService(req.Logger);
  calorieService.createCalorie(req.swagger.params, res, next);
};

/**
 * Get all calories
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getCalorieList = function getCalorieList(req, res, next) {
  let calorieService = new CalorieService(req.Logger);
  calorieService.getCalorieList(req.swagger.params, res, next);
};

/**
 * Get calorie with given calorie_id
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getCalorie = function getCalorie(req, res, next) {
  let calorieService = new CalorieService(req.Logger);
  calorieService.getCalorie(req.swagger.params, res, next);
};

/**
 * Update calorie with given calorie_id
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.updateCalorie = function updateCalorie(req, res, next) {
  let calorieService = new CalorieService(req.Logger);
  calorieService.updateCalorie(req.swagger.params, res, next);
};