(function () { angular.module('base')
.controller('OwnersCtrl', ['$scope', 'serverSrv', function ($scope, serverSrv) {
    var vm = this;

	var rows = [{
		name: "dima"
	},{
		name: 'anna'
	},{
		name: 'other'
	}];

	$scope.columnDefs = [{
		name: 'name',
		cellEditable: false
	},{
		name: 'total',
		cellEditable: false
	},{
		name: 'expected',
		cellEditable: false
	},{
		name: 'considered',
		type: 'boolean',
		cellTemplate: 'grid-consider.html'
	}];

	$scope.confirmPayment = confirmPayment;
	serverSrv.execute(
	"select "+
" sum (percentDima  *  price * cast( consideredDima  as int) ) as totalDima," +
" sum (percentAnna  *  price * cast( consideredAnna  as int) ) as totalAnna, " +
" sum (percentOther *  price * cast( consideredOther as int) ) as totalOther, " +
" sum (percentDima  *  price * cast( NOT COALESCE(consideredDima, false)  as int) ) as expectedDima," +
" sum (percentAnna  *  price * cast( NOT COALESCE(consideredAnna, false)  as int) ) as expectedAnna, " +
" sum (percentOther *  price * cast( NOT COALESCE(consideredOther, false) as int) ) as expectedOther " +
	" from goods where sold = true group by ();")

		.then(function (data) {


		_.each(data[0], function (value, key) {
			_.each(rows, function (row) {
				if (_.includes(key, row.name)) {
					var columnName = key.split(row.name)[0];
					row[columnName] = value;
				}
			});
		});

		$scope.data = rows;


    });

	// function onRegisterApi (gridApi) {
	// 	gridApi.edit.on.afterCellEdit($scope, cellValueChanged);
	// }
	//
	function confirmPayment (rowEntity) {
		console.log('[gridSrv] cellValueChanged()', arguments);
		var name = 'considered' + rowEntity.name;
		var obj = {};
		obj[name] = true;
		serverSrv.update('goods', obj, 'all').then(function (data) {
			rowEntity.total = _.toNumber(rowEntity.total) +  _.toNumber(rowEntity.expected);
			rowEntity.expected = 0;
		});
	}
}])
})();