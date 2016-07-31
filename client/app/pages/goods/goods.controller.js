(function () { angular.module('base')
.controller('GoodsCtrl', ['$scope', 'serverSrv', function ($scope, serverSrv) {
    var vm = this;

    vm.newPhotos = [];

    $scope.$on('file-reading-finished', function(){
        console.log('file-reading-finished', arguments);
        serverSrv.create('goods', _.toArray(vm.newPhotos)).then(function (serverData) {
            $scope.$resolve.data.data = _.concat($scope.$resolve.data.data , serverData);
        });
    });

}])
})();