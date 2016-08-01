(function () {
	angular.module('base').constant('GOODS', {
		"id": {
			name: 'id',
			type: "number",
			visible: false
		},
		"img": {
			name: 'img',
			displayName: "Цаца",
			type: "text",
			cellTemplate: "grid-img.html",
			width: 150
		},
		"name": {
			name: 'name',
			displayName: "Имя",
			type: "text"

		},
		"date": {
			name: 'date',
			displayName: "Дата",
			type: "date",
			width: 120
		},
		"percentdima": {
			name: 'percentdima',
			type: "number",
			displayName: "Дима, %"

		},
		"percentanna": {
			name: 'percentanna',
			type: "number",
			displayName: "Анна, %"

		},
		"percentother": {
			name: 'percentother',
			type: "number",
			displayName: "Кто-то, %"

		},
		"decription": {
			name: 'decription',
			displayName: "Описание",
			type: "text"

		},
		"type": {
			name: 'type',
			displayName: "Тип",
			type: "text"

		},
		"sold": {
			name: 'sold',
			displayName: "Продано",
			type: "boolean"

		},
		"price": {
			name: 'price',
			displayName: "Цена",
			type: "number"

		},
		"keywords": {
			name: 'keywords',
			displayName: "Ключи",
			type: "text"

		},
		"considereddima": {
			name: 'considereddima',
			displayName: "Диме отдали",
			type: "boolean",
			visible: false

		},
		"consideredanna": {
			name: 'consideredanna',
			displayName: "Ане отдали",
			type: "boolean",
			visible: false

		},
		"consideredother": {
			name: 'consideredother',
			displayName: "Кому-то отдали",
			type: "boolean",
			visible: false
		}
	});
})();