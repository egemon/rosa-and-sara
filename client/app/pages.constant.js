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
            name: 'Товары'
        },{
            url: 'owners',
            name: 'Собственники'
        }
    ]);

})();