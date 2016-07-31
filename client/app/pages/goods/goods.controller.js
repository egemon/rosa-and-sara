(function () { angular.module('base')
.controller('GoodsCtrl', ['$scope', 'serverSrv', 'gridSrv', function ($scope, serverSrv, gridSrv) {
    var vm = this;
    vm.newPhotos = [];
    $scope.onRegisterApi = gridSrv.getOnRegisterApi($scope);

    serverSrv.read('information_schema.columns', {table_name: " = 'goods'"})
    .then(function (data) {
        console.log('info-columns', data);
        var defs = _.map(data.data, function (item){
            return _.pick(item, ['column_name', 'data_type']);
        });
        $scope.columnDefs = gridSrv.generateDefs(defs);

        serverSrv.read('goods', 'all').then(function (dataResp) {
            $scope.data = dataResp.data;

        });
    })


    $scope.$on('file-reading-finished', function(){
        console.log('file-reading-finished', arguments);
        vm.newPhotos = _.map(vm.newPhotos, function (item) {
            return _.extend(item, {
                dima: vm.dima,
                anna: vm.anna,
                other: vm.other,
                date: vm.date
            });
        });
        serverSrv.create('goods', _.toArray(vm.newPhotos)).then(function (serverData) {
            $scope.data = _.concat($scope.data , serverData);
        });
    });

}])
})();