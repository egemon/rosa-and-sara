(function () { angular.module('base')
.controller('BaseCtrl', ['$scope', 'pages', function ($scope, pages) {
     $scope.tabs = pages;
     $scope.active = findPageByUrl(location.hash.replace('#/','') || 'supplies');

     function findPageByUrl(url) {
         for (var i = 0; i < pages.length; i++) {
            if (pages[i].url === url) {
                return i+1
            }
         }
     }
}])
})();