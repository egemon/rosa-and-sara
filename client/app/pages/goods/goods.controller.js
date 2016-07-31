(function () { angular.module('base')
.controller('GoodsCtrl', ['$scope', 'serverSrv', 'gridSrv', function ($scope, serverSrv,gridSrv) {
    var vm = this;
    vm.newPhotos = [];
    $scope.onRegisterApi = gridSrv.getOnRegisterApi($scope);

    serverSrv.read('goods', 'all').then(function (dataResp) {
        $scope.data = dataResp.data;
        // $scope.columnDefs;

    });


    $scope.$on('file-reading-finished', function(){
        console.log('file-reading-finished', arguments);
        serverSrv.create('goods', _.toArray(vm.newPhotos)).then(function (serverData) {
            $scope.data = _.concat($scope.data , serverData);
        });
    });

}])
})();