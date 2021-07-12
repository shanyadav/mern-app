'use strict';

/**
 * Link header helper
 *
 * Build up the rel link using sort/pagination
 *
 * @module LinkHeaderHelper
 */
module.exports = {

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
   * @throws Error - If any of the required fields are not set
   *
   * @return Object - Object with host, port etc
   */
  getRelLink: function getRelLink(options, totalCount, currentPage, itemsPerPage) {
    let requiredFields = ['host', 'protocol', 'url'];

    for (let i = 0; i < requiredFields.length; i++) {
      let key = requiredFields[i];
      if (!options[key]) {
        throw new Error('No [' + key + '] is set for rel link');
      }
    }

    let url = options.protocol + '://' + options.host;
    if (options.port) {
      url +=  ':' + options.port + '';
    }

    // Add starting '/' if it is missing
    if (options.url.indexOf('/') !== 0) {
      url += '/';
    }

    // Add ending '?' if it is not set. Should always be required since there is default pagination options
    if (options.url.indexOf('?') === -1) {
      url += options.url + '?';
    } else {
      url += options.url;
    }

    return _buildRelLink(url, totalCount, currentPage, itemsPerPage);
  }
};

/**
 * This will do the rel linking on the GETLISTs.
 *
 * @param {String} url - The current url
 * @param {Number} count - The total results fetched
 * @param {Number} page - The current page number
 * @param {Number} itemsPerPage - The maximum number of items on a page
 *
 * @private
 *
 * @returns {String} - The rel link
 */
function _buildRelLink(url, count, page, itemsPerPage) {
  let relLinkTemplate = '<%spage=%s&items_per_page=%s>; rel="%s"';
  let char = '%s';
  let arrRelLink = [];
  // First page always exists
  arrRelLink.push(_doRegexReplace(relLinkTemplate, char, url, 1, itemsPerPage, 'first'));

  // Last page always exists
  let lastPg = (count == 0) ? 1 : Math.ceil(count / itemsPerPage);
  arrRelLink.push(_doRegexReplace(relLinkTemplate, char, url, lastPg, itemsPerPage, 'last'));

  // Next page exists if the current page is less than the last page
  if (page < lastPg) {
    arrRelLink.push(_doRegexReplace(relLinkTemplate, char, url, page + 1, itemsPerPage, 'next'));
  }
  // Previous page exists if the current page is greater than one
  if (page > 1) {
    arrRelLink.push(_doRegexReplace(relLinkTemplate, char, url, page - 1, itemsPerPage, 'prev'));
  }

  return arrRelLink.join(',');
}

/**
 * This will format a string and replace the given string pattern: char wherever it occurs with
 * the url, iPage, itemsPerPage and sPage respectively
 *
 * @param {String} templateString - The string to be formatted
 * @param {String} char - The string pattern to be replaced
 * @param {String} url - The current url
 * @param {Number} iPage - The current page number
 * @param {Number} itemsPerPage - The maximum number of items on a page
 * @param {Number} sPage - The current page number
 *
 * @private
 *
 * @returns {String} formattedString - The formatted string
 */
function _doRegexReplace(templateString, char, url, iPage, itemsPerPage, sPage) {
  let formattedString = templateString.replace(char, url)
    .replace(char, iPage)
    .replace(char, itemsPerPage)
    .replace(char, sPage);
  return formattedString;
}