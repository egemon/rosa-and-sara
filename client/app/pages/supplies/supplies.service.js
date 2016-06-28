(function () { angular.module('base')
.service('suppliesSrv', ['config', '$http', function (config, $http) {

    return {
        getSupplies: getSupplies,
        setSupplies: setSupplies,
    }

    function getSupplies () {
        return $http.post(config.BASE_SERVER_URL + '/supplies', {

        }).then(function (response) {
            var supplies = response.data;
            for (var i = 0; i < supplies.length; i++) {
                var supply = supplies[i];
                var newRule = '';
                for (var name in supply.rule) {
                    newRule += name + ' - '+ supply.rule[name] + ';'
                }
                supply.rule = newRule;
            }
            return supplies;
        })
        .catch(function (err) {
            // alert('Something went wrong!');
            console.log('getSupplies err = ', err);
        });
    }

    function setSupplies () {

    }

    }])
})();