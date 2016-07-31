(function () { angular.module('base')
.service('gridSrv', ['serverSrv', 'GOODS', function (serverSrv, GOODS) {

    return {
        getOnRegisterApi: getOnRegisterApi,
        generateDefs: generateDefs
    };

    function getOnRegisterApi($scope) {
        console.log('[gridSrv] getOnRegisterApi()', arguments);
        return function onRegisterApi(gridApi) {
            gridApi.edit.on.afterCellEdit($scope, cellValueChanged);

            $scope.deleteRow = deleteRow;
        };
    }

    function cellValueChanged(rowEntity, colDef, newValue, oldValue) {
        console.log('[gridSrv] cellValueChanged()', arguments);
        if (newValue !== oldValue) {
            return serverSrv.update('goods', rowEntity, rowEntity.id);
        }
    }

    function generateDefs (columns) {
        var columnDefs = _.map(columns, function (column) {
            return GOODS[column.column_name];
        });
        columnDefs.push({
            name: 'delete',
            displayName: 'Удалить цацу',
            cellTemplate: 'grid-controls.html'
        });

        return columnDefs;
    }


    function deleteRow (item, items) {
        item = item.entity;
        serverSrv.delete('goods', item.id)
        .then(function (data) {
            _.remove(items, item);
        });

    }
}]);
})();