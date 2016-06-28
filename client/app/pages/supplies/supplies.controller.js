(function () { angular.module('base')
.controller('SuppliesCtrl', ['$scope', 'suppliesSrv', function ($scope, suppliesSrv) {
    var vm = this;

    suppliesSrv.getSupplies().then(function (data) {
        vm.data = data;
    });
}])
})();