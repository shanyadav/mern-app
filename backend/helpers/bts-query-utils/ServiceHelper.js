'use strict';

const LinkHeaderHelper = require('./LinkHeaderHelper');

/**
 * The Service Helper module
 *
 * @module ServiceHelper
 */
module.exports = {

  /**
   * This will determine what http library needs to be used based on the passed in protocol
   *
   * @param {Object} httpProtocol - The initial configurations to which the extra options will be added
   * @param {function} callback - The callback that will handle the result
   *
   */
  determineHttpProtocol: function determineHttpProtocol(httpProtocol, callback) {
    let protocolError;
    switch (httpProtocol) {
      case 'http':
        return callback(null, 'http');
      case 'https':
        return callback(null, 'https');
      default:
        protocolError = {
          message: 'HTTP Protocol [' + httpProtocol + '] Not Supported'
        };
        return callback(protocolError, null);
    }
  },

  /**
   * This will filter the headers we retrieve after call to upstream server
   *
   *
   * @param {Object} objHeaders - The headers to verify
   * @param {Array} arrAllowedHeaders - The list of acceptable headers
   * @param {Object} funcRelLink - The function that will be used to do the rel link transformation
   *
   * @return {Object} allowedHeaders - The filtered headers
   */
  returnAllowedHeaders: function returnAllowedHeaders(objHeaders, arrAllowedHeaders, funcRelLink) {
    let allowedHeaders = {};
    for (let header in objHeaders) {
      if (
        objHeaders.hasOwnProperty(header) &&
        arrAllowedHeaders.indexOf(header.toLowerCase()) !== -1
      ) {
        if (header.toLowerCase() === 'link' && funcRelLink && typeof funcRelLink === 'function') {
          objHeaders[header] = funcRelLink(objHeaders[header]);
        }
        allowedHeaders[header] = objHeaders[header];
      }
    }
    return allowedHeaders;
  },

  /**
   * Build the rel link
   *
   * Required fields on options arg:
   * - host
   * - protocol
   * - url i.e /v1/this-route
   *
   * Optionals:
   * - port
   *
   * @param Object options - options object with host, port, protocol and url
   * @param integer totalCount - Total number of items returned for query
   * @param integer currentPage - The current viewing page
   * @param integer itemsPerPage - The current items shown per page
   *
   *
   * @throws Error - If any of the required fields are not set
   *
   * @return Object - Object with host, port etc
   */
  getRelLink: LinkHeaderHelper.getRelLink

};