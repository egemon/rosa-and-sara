(function () { angular.module('base')
.controller('SuppliesCtrl', ['$scope', 'pages', 'suppliesSrv', function ($scope, pages, suppliesSrv) {
    var vm = this;

    suppliesSrv.getSupplies().then(function (data) {
        vm.data = data;
    });



}])
})();