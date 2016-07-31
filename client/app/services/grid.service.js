(function () { angular.module('base')
.service('gridSrv', ['serverSrv', function (serverSrv) {

    return {
        getOnRegisterApi: getOnRegisterApi
    };

    function getOnRegisterApi($scope) {
        console.log('[gridSrv] getOnRegisterApi()', arguments);
        return function onRegisterApi(gridApi) {
            gridApi.edit.on.afterCellEdit($scope, cellValueChanged);
        };
    }

    function cellValueChanged(rowEntity, colDef, newValue, oldValue) {
        console.log('[gridSrv] cellValueChanged()', arguments);
        if (newValue !== oldValue) {
            return serverSrv.update('goods', rowEntity, rowEntity.id);
        }
    }

}]);
})();