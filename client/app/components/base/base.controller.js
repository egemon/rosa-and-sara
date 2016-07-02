(function () { angular.module('base')
.controller('BaseCtrl', ['$scope', 'pages', function ($scope, pages) {
     $scope.tabs = pages;
     $scope.active = findPageByUrl(location.hash.replace('#/','') || 'supplies');
     var vm = this;
     vm.deleteRow = deleteRow;

     function deleteRow(row, array) {
        var index = array.indexOf(row.entity);
        array.splice(index, 1);
     }


     function findPageByUrl(url) {
         for (var i = 0; i < pages.length; i++) {
            if (pages[i].url === url) {
                return i+1
            }
         }
     }
}])
})();