(function () { angular.module('base')
	.constant('GOODS', {
		"id": {
			name: 'id',
			type: "number",
			visible: false,
		},
		"img": {
			name: 'img',
			type: "text",
			cellTemplate: "grid-img.html",
			width: 50,
		},
		"name": {
			name: 'name',
			type: "text",

		},
		"date": {
			name: 'date',
			type: "date",
			width: 120
		},
		"dima": {
			name: 'dima',
			type: "number",

		},
		"anna": {
			name: 'anna',
			type: "number",

		},
		"other": {
			name: 'other',
			type: "number",

		},
		"decription": {
			name: 'decription',
			type: "text",

		},
		"type": {
			name: 'type',
			type: "text",

		},
		"sold": {
			name: 'sold',
			type: "boolean",

		},
		"price": {
			name: 'price',
			type: "number",

		},
		"keywords": {
			name: 'keywords',
			type: "text",

		},
	});
})();