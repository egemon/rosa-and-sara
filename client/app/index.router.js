(function () {
    angular.module('base')
    .config(['$stateProvider', '$urlRouterProvider', 'config', 'pages',  routerConfig]);

  function routerConfig ($stateProvider, $urlRouterProvider, config, pages) {

    config.BASE_SERVER_URL = location.origin + '/';

    $urlRouterProvider.otherwise('/' + pages[0].url);

    for (var i = 0; i < pages.length; i++) {
      var page = pages[i];
      var url = '/' + page.url;

      $stateProvider.state(url, {
        url: url,
        templateUrl: page.url + '.html',
        controller: page.controller,
      });
    }
  }

})();