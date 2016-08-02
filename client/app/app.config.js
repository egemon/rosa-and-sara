/**
 * Created by ilukianov on 01.08.16.
 */
(function () {
angular.module('base')
.config(['$httpProvider', '$provide', function ($httpProvider, $provide) {
	$provide.factory('myHttpInterceptor', ['usSpinnerService', 'toaster', '$q', function(usSpinnerService, toaster, $q) {

		return {
			'request': function(config) {
				console.log('request()', arguments);
				usSpinnerService.spin('loading');
				return config;
			},
			'requestError': function(rejection) {
				console.log('requestError()', arguments);
				usSpinnerService.stop('loading');
				toaster.error('Error', rejection);
				return $q.reject(rejection);
			},


			'response': function(response) {
				console.log('response()', arguments);
				usSpinnerService.stop('loading');
				if (_.includes(response.config.url, 'http')) {
					if (_.isPlainObject(response.data) ) {
						return response.data.data;
					}

					return response.data;
				}
				return response;
			},
			'responseError': function(rejection) {
				console.log('responseError()', arguments);
				usSpinnerService.stop('loading');
				toaster.error('Error', rejection);
				return $q.reject(rejection);
			}
		};
	}]);
	$httpProvider.interceptors.push('myHttpInterceptor');
}])
})();