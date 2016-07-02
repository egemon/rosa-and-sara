(function () {
    angular.module('base')
    .config(['$stateProvider', '$urlRouterProvider', 'config', 'pages',
     routerConfig]);

function routerConfig ($stateProvider, $urlRouterProvider, config, pages) {

  config.BASE_SERVER_URL = location.origin + '/';

  $urlRouterProvider.otherwise('/' + pages[0].url);

  for (var i = 0; i < pages.length; i++) {
    var page = pages[i];
    (function (page) {
      var url = '/' + page.url;
      var dataKey = page.url;
      $stateProvider.state(url, {
        url: url,
        templateUrl: page.url + '.html',
        controller: page.controller,
        resolve: {
          gridOptions: ['serverSrv', 'gridSrv', function (serverSrv, gridSrv) {
            // serverSrv.getWithDefs(page.url).then(function (data) {
            //  console.log('data', data);
            // });
            var gridOptions = serverSrv.getWithDefs(page.url);
            // gridOptions.onRegisterApi = gridSrv.getOnRegisterApi($scope);

            return gridOptions;
          }]
        }
      });
    })(page);

  }
}

})();