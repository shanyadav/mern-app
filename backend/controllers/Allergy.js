'use strict';

const AllergyService = require('../services/AllergyService');

/**
 * Created a new allergy
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.createAllergy = function createAllergy(req, res, next) {
  let allergyService = new AllergyService(req.Logger);
  allergyService.createAllergy(req.swagger.params, res, next);
};

/**
 * Get all allergies
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getAllergyList = function getAllergyList(req, res, next) {
  let allergyService = new AllergyService(req.Logger);
  allergyService.getAllergyList(req.swagger.params, res, next);
};

/**
 * Get allergy with given allergy_id
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getAllergy = function getAllergy(req, res, next) {
  let allergyService = new AllergyService(req.Logger);
  allergyService.getAllergy(req.swagger.params, res, next);
};

/**
 * Update allergy with given allergy_id
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.updateAllergy = function updateAllergy(req, res, next) {
  let allergyService = new AllergyService(req.Logger);
  allergyService.updateAllergy(req.swagger.params, res, next);
};