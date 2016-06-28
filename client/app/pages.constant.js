(function () {
    angular.module('base')
    .constant('pages', [
        {
            // default page
            url: 'supplies',
            name: 'Поставки',
            controller: 'SuppliesCtrl as SuppliesCtrl'
        },{
            url: 'goods',
            name: 'Товары',
            controller: 'GoodsCtrl as GoodsCtrl'
        },{
            url: 'owners',
            name: 'Собственники'
        }
    ]);

})();