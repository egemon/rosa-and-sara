(function () { angular.module('base')
.service('serverSrv', ['config', '$http', function (config, $http) {

    return {
        get: get,
        set: set,
    }

    function get (subj) {
        return $http.post(config.BASE_SERVER_URL + 'get', {
            subj: subj
        }).then(function (response) {
            return response.data;
        })
        .catch(function (err) {
            // alert('Something went wrong!');
            console.log('getSupplies err = ', err);
        });
    }

    function set (subj) {
        return $http.post(config.BASE_SERVER_URL + 'set', {
            subj: subj
        }).then(function (response) {
            return response.data;
        })
        .catch(function (err) {
            // alert('Something went wrong!');
            console.log('getSupplies err = ', err);
        });
    }
}])
})();