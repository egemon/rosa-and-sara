(function () { angular.module('base')
.controller('GoodsCtrl', ['$scope', 'serverSrv', 'gridSrv', function ($scope, serverSrv, gridSrv) {
    var vm = this;
    vm.newPhotos = [];
    $scope.onRegisterApi = gridSrv.getOnRegisterApi($scope);
	$scope.rowHeight = 120;


    serverSrv.read('information_schema.columns', {table_name: " = 'goods'"})
    .then(function (data) {
        console.log('info-columns', data);
        var defs = _.map(data, function (item){
            return _.pick(item, ['column_name', 'data_type']);
        });
        $scope.columnDefs = gridSrv.generateDefs(defs);
	    serverSrv.read('goods', 'all').then(function (data) {
            $scope.data = data;

        });
    });


    $scope.$on('file-reading-finished', function(){
        console.log('file-reading-finished', arguments);
        vm.newPhotos = _.map(vm.newPhotos, function (item) {
            return _.extend(item, {
                percentdima: vm.percentdima,
                percentanna: vm.percentanna,
                percentother: vm.percentother,
                date: vm.date
            });
        });
        serverSrv.create('goods', _.toArray(vm.newPhotos))
            .then(function (data) {
                $scope.data = _.concat($scope.data , data);
            });
    });

}])
})();