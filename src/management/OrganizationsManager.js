var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

/**
 * Simple facade for consuming a REST API endpoint.
 * @external RestClient
 * @see https://github.com/ngonzalvez/rest-facade
 */

/**
 * @class OrganizationsManager
 * The organization class provides a simple abstraction for performing CRUD operations
 * on Auth0 OrganizationsManager.
 * @constructor
 * @memberOf module:management
 *
 * @param {Object} options            The client options.
 * @param {String} options.baseUrl    The URL of the API.
 * @param {Object} [options.headers]  Headers to be included in all requests.
 * @param {Object} [options.retry]    Retry Policy Config
 */
var OrganizationsManager = function(options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide manager options');
  }

  if (options.baseUrl === null || options.baseUrl === undefined) {
    throw new ArgumentError('Must provide a base URL for the API');
  }

  if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
    throw new ArgumentError('The provided base URL is invalid');
  }

  /**
   * Options object for the Rest Client instance.
   *
   * @type {Object}
   */
  var clientOptions = {
    headers: options.headers,
    query: { repeatParams: false }
  };

  /**
   * Provides an abstraction layer for performing CRUD operations on
   * {@link https://auth0.com/docs/api/v2#!/OrganizationsManager Auth0 OrganizationsManagers}.
   *
   * @type {external:RestClient}
   */
  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/organizations/:id',
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};

/**
 * Create a new organization.
 *
 * @method    create
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * management.organizations.create(data, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Organization created.
 * });
 *
 * @param   {Object}    data     Organization data object.
 * @param   {Function}  [cb]     Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(OrganizationsManager, 'create', 'resource.create');

/**
 * Get all organizations.
 *
 * @method    getAll
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example <caption>
 *   This method takes an optional object as first argument that may be used to
 *   specify pagination settings. If pagination options are not present,
 *   the first page of a limited number of results will be returned.
 * </caption>
 *
 * // Pagination settings.
 * var params = {
 *   per_page: 10,
 *   page: 0
 * };
 *
 * management.organizations.getAll(params, function (err, organizations) {
 *   console.log(organizations.length);
 * });
 *
 * @param   {Object}    [params]          Organizations parameters.
 * @param   {Number}    [params.per_page] Number of results per page.
 * @param   {Number}    [params.page]     Page number, zero indexed.
 * @param   {Function}  [cb]              Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(OrganizationsManager, 'getAll', 'resource.getAll');

/**
 * Get an Auth0 organization.
 *
 * @method    get
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * management.organizations.get({ id: ORGANIZATION_ID }, function (err, organization) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(organization);
 * });
 *
 * @param   {Object}    params        Organization parameters.
 * @param   {String}    params.id     Organization ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(OrganizationsManager, 'get', 'resource.get');

/**
 * Update an existing organization.
 *
 * @method    update
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * var data = { name: 'New name' };
 * var params = { id: ORGANIZATION_ID };
 *
 * // Using auth0 instance.
 * management.updateOrganization(params, data, function (err, organization) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(organization.name);  // 'New name'
 * });
 *
 * // Using the organizations manager directly.
 * management.organizations.update(params, data, function (err, organization) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   console.log(organization.name);  // 'New name'
 * });
 *
 * @param   {Object}    params        Organization parameters.
 * @param   {String}    params.id     Organization ID.
 * @param   {Object}    data          Updated organization data.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(OrganizationsManager, 'update', 'resource.patch');

/**
 * Delete an existing organization.
 *
 * @method    delete
 * @memberOf  module:management.OrganizationsManager.prototype
 *
 * @example
 * management.organizations.delete({ id: ORGANIZATION_ID }, function (err) {
 *   if (err) {
 *     // Handle error.
 *   }
 *
 *   // Organization deleted.
 * });
 *
 * @param   {Object}    params        Organization parameters.
 * @param   {String}    params.id     Organization ID.
 * @param   {Function}  [cb]          Callback function.
 *
 * @return  {Promise|undefined}
 */
utils.wrapPropertyMethod(OrganizationsManager, 'delete', 'resource.delete');

module.exports = OrganizationsManager;
