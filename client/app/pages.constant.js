(function () {
    angular.module('base')
    .constant('pages', [
        {
            // default page
            url: 'goods',
            name: 'Товары',
            controller: 'GoodsCtrl as GoodsCtrl'
        },{
            url: 'owners',
            name: 'Собственники',
            controller: 'OwnersCtrl as OwnersCtrl'
        }
    ]);

})();