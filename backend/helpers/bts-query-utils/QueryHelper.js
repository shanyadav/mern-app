'use strict';

const _ = require('lodash');

/**
 * The list of query params to be excluded from final query
 *
 * @let {Array} exclusionList
 */
let exclusionList = ['sortBy', 'page', 'items_per_page'];

/**
 * The list of query params to be excluded from final query when
 * creating url query and sorting string to be used for the rel links
 *
 * @let {Array} paginationExclusionList
 */
let paginationExclusionList = ['page', 'items_per_page'];

/**
 * An instance of the query helper
 *
 *
 * @module QueryHelper
 */
module.exports = {

  /**
   * Create a query object that can be passed to an end point.
   *
   * @param {object} params - All params possible from swagger
   * @param {Array} exclusion - The exclusion array
   *
   *
   * @returns {Object} - Remapped query object that can be passed to an end point
   */
  getConvertedQueryObject: function getConvertedQueryObject(params, exclusion) {

    let queryObject = {};
    let queryParams = _getQueryParamsFromSwaggerParams(params);
    for (let property in queryParams) {
      if (queryParams.hasOwnProperty(property) && !_.isNil(params[property].value)) {
        if ((!exclusion) || (exclusion && exclusion.indexOf(property) === -1)) {
          let value = params[property].value;
          queryObject[property] = value;
        }
      }
    }
    return queryObject;
  },

  /**
   * This will build up the url query using the query params that are passed in
   *
   * @param {Object} queryParams - The getList query params
   * @param {String} urlPath - The service url path
   *
   *
   * @returns {String} The complete url path
   */
  buildQueryParams: function buildQueryParams(queryParams, urlPath) {
    let completeQueryString = '';

    for (let queryParam in queryParams) {
      if (queryParams.hasOwnProperty(queryParam)) {
        completeQueryString += queryParam + '=' + queryParams[queryParam] + '&';
      }
    }

    if (completeQueryString != '') {
      // slice removes the last &
      urlPath += '?' + completeQueryString.slice(0, -1);
    }
    return urlPath;
  },

  /**
   * This will build up an encoded url query using the query params that are passed in
   *
   * @param {Object} queryParams - The getList query params
   * @param {String} urlPath - The service url path
   *
   *
   * @returns {String} The complete encoded url path
   */
  buildEncodedQueryParams: function buildEncodedQueryParams(queryParams, urlPath) {
    let encodedParams = {};
    _.forEach(queryParams, function queryEncode(value, key) {
      encodedParams[key] = encodeURIComponent(value);
    });

    return this.buildQueryParams(encodedParams, urlPath);
  },

  /**
   * Get an object with only the sort params
   *
   * @param {object} args - The Swagger params
   *
   *
   * @returns {object} sortParams - The sort params
   */
  getSortParams: function getSortParams(args) {
    let queryParams = this.getConvertedQueryObject(args);
    let sortParams = {};
    // If the field property is defined in query
    if (!_.isEmpty(queryParams.sortBy)) {
      let arrSortParams = queryParams.sortBy;
      for (let i = 0; i < arrSortParams.length; i++) {
        if (arrSortParams[i].charAt(0) === '-') {
          let field = arrSortParams[i].replace('-', '');
          sortParams[field] = -1;
        } else {
          sortParams[arrSortParams[i]] = 1;
        }

      }
    }
    return sortParams;
  },

  /**
   * This will retrieve the arguments for skip()
   *
   * @param {object} args - The Swagger params
   * @param {object} limit - The items per page
   *
   *
   * @returns {Number} - The number to be passed into skip()
   */
  getSkipValue: function getSkipValue(args, limit) {
    let page = this.getPage(args);

    return (page - 1) * limit;

  },

  /**
   * This will retrieve the page of the documents
   *
   * @param {object} args - The Swagger params
   *
   *
   * @returns {Number} page - The page
   */
  getPage: function getPage(args) {
    let queryParams = this.getConvertedQueryObject(args);
    let page = 1;

    if (!_.isNil(queryParams.page)) {
      page = queryParams.page;
    }

    return page;

  },

  /**
   * This will retrieve the items per page
   *
   * @param {object} args - The Swagger params
   *
   *
   * @returns {Number} - The items per page
   */
  getItemsPerPage: function getItemsPerPage(args) {
    let queryParams = this.getConvertedQueryObject(args);
    let limit = 25;

    if (!_.isNil(queryParams.items_per_page)) {
      limit = queryParams.items_per_page;
    }

    return limit;

  },

  /**
   * This will retrieve the blog posts per page
   *
   * @param {object} args - The Swagger params
   *
   *
   * @returns {Number} - The items per page
   */
  getPostsPerPage: function getPostsPerPage(args) {
    let queryParams = this.getConvertedQueryObject(args);
    let limit = 5;

    if (!_.isNil(queryParams.blog_post_per_page)) {
      limit = queryParams.blog_post_per_page;
    }

    return limit;

  },
  /**
   * This will retrieve the items per page
   *
   * @param {object} args - The Swagger params
   *
   *
   * @returns {Number} - The items per page
   */
  getNotificationsPerPage: function getNotificationsPerPage(args) {
    let queryParams = this.getConvertedQueryObject(args);
    let limit = 10;

    if (!_.isNil(queryParams.notification_per_page)) {
      limit = queryParams.notification_per_page;
    }

    return limit;

  },

  /**
   * This will retrieve query properties and return the query object to make the database call
   * All the query params with the wild card character will be converted to their correct mongo regex form
   *
   * @param {Object} args - All params possible from swagger
   * @param {Array} ignoreCase - The array that has parameters to get searched by case insensitively
   *
   *
   * @returns {Object} query - The query object
   */
  getQuery: function getQuery(args, ignoreCase) {
    let query = this.getConvertedQueryObject(args, exclusionList);
    for (let property in query) {
      if (typeof query[property] === 'string' &&
        (
          query[property].indexOf('*') !== -1 ||
          !_.isNil(ignoreCase) &&
          ignoreCase.indexOf(property) !== -1
        )
      ) {
        let queryRegexString = query[property];
        if (query[property].charAt(query[property].length - 1) !== '*') {
          queryRegexString = queryRegexString + '$';
        }
        if (query[property].charAt(0) !== '*') {
          queryRegexString = '^' + queryRegexString;
        }
        queryRegexString = queryRegexString.replace(/\*/g, '.*');
        query[property] = {$regex: new RegExp(queryRegexString, 'i')};
      }
      if (typeof query[property] === 'object') {
        query[property] = {$in: query[property]};
      }
    }
    return query;
  },

  /**
   * This will retrieve the query and sorting string to be added to the url
   *
   * @param {Object} args - All params possible from swagger
   *
   *
   * @returns {String} - The query string
   */
  getQueryAndSortingString: function getQueryAndSortingString(args) {
    let originalQuery = this.getConvertedQueryObject(args, paginationExclusionList);
    let arrQueryString = [];
    if (Object.keys(originalQuery).length !== 0) {
      for (let key in originalQuery) {
        if (originalQuery.hasOwnProperty(key)) {
          if (Array.isArray(originalQuery[key])) {
            arrQueryString.push(key + '=' + originalQuery[key].join(','));
          } else {
            arrQueryString.push(key + '=' + originalQuery[key]);
          }
        }
      }
    }
    return arrQueryString.join('&');
  }
};

/**
 * Get an object with only the QUERY params
 *
 * @param {object} params - All params possible from swagger
 *
 *
 * @private
 *
 * @returns {Object} - An object with query params
 */
function _getQueryParamsFromSwaggerParams(params) {
  let queryParams = {};
  let arrKeys = Object.keys(params);
  arrKeys.forEach(
    function forEach(key) {
      if (params[key]['schema']['in'] == 'query') {
        queryParams[key] = params[key];
      }
    }
  );

  return queryParams;
}
