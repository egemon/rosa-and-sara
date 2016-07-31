(function () { angular.module('base')
.service('gridSrv', ['serverSrv', function (serverSrv) {

    return {
        getOnRegisterApi: getOnRegisterApi
    };

    function getOnRegisterApi($scope) {
        return function onRegisterApi(gridApi) {
            gridApi.edit.on.afterCellEdit($scope, cellValueChanged);
        };
    }

    function cellValueChanged(rowEntity, colDef, newValue, oldValue) {
        if (newValue !== oldValue) {
            return serverSrv.update('goods', rowEntity, rowEntity.id);
        }
    }

}]);
})();