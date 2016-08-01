(function () {
    angular.module('base')
    .constant('pages', [
        {
            // default page
            url: 'goods',
            name: 'Товары',
            controller: 'GoodsCtrl as GoodsCtrl'
        },{
            url: 'totals',
            name: 'Итоги',
            controller: 'TotalsCtrl as TotalsCtrl'
        }
    ]);

})();