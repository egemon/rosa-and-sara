(function () {
    angular.module('base')
    .constant('pages', [
        {
            // default page
            url: 'supplies',
            name: 'Поставки'
        },{
            url: 'goods',
            name: 'Товары'
        },{
            url: 'owners',
            name: 'Собственники'
        }
    ]);

})();