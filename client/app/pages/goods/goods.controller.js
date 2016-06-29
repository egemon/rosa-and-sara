(function () { angular.module('base')
.controller('GoodsCtrl', ['$scope', 'serverSrv', function ($scope, serverSrv) {
    var vm = this;

    vm.newPhotos = [];

    serverSrv.get('goods-columnDefs').then(function (columnDefs) {
       $scope.columnDefs = columnDefs;
    });

    $scope.$on('file-reading-finished', function(){
        serverSrv.get('goods-tmpl').then(function (tmpl) {
            var newItems = createNewItems(vm.newPhotos, tmpl)
            $scope.$resolve.data = $scope.$resolve.data.concat(newItems);
        })
    });

    // ===== PRIVATE =======

    function createNewItems(newPhotos, tmpl) {
        var data = [];
        for (var i = 0; i < newPhotos.length; i++) {
            var item = angular.copy(tmpl);
            item.img = newPhotos[i];
            data[i] = item;
        }
        return data;
    }

}])
})();