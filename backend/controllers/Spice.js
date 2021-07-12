'use strict';

const SpiceService = require('../services/SpiceService');

/**
 * Created a new spice
 *
 * @param {spicetRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.createSpice = function createSpice(req, res, next) {
  let spiceService = new SpiceService(req.Logger);
  spiceService.createSpice(req.swagger.params, res, next);
};

/**
 * Get all spices
 *
 * @spiceam {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getSpiceList = function getSpiceList(req, res, next) {
  let spiceService = new SpiceService(req.Logger);
  spiceService.getSpiceList(req.swagger.params, res, next);
};

/**
 * Get spice with given spice_id
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.getSpice = function getSpice(req, res, next) {
  let spiceService = new SpiceService(req.Logger);
  spiceService.getSpice(req.swagger.params, res, next);
};

/**
 * Update spice with given spice_id
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 */
module.exports.updateSpice = function updateSpice(req, res, next) {
  let spiceService = new SpiceService(req.Logger);
  spiceService.updateSpice(req.swagger.params, res, next);
};