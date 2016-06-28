(function () { angular.module('base')
.controller('BaseCtrl', ['$scope', function ($scope) {
     $scope.tabs = [
        { title:'Поставки', content:'Поставки' },
        { title:'Товары', content:'Товары'},
        { title:'Собственники', content:'Собственники'},
      ];


}])
})();