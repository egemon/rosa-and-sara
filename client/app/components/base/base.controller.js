(function () { angular.module('base')
.controller('BaseCtrl', ['$scope', 'pages', function ($scope, pages) {
     $scope.tabs = pages;


}])
})();