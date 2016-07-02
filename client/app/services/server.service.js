(function () { angular.module('base')
.service('serverSrv', ['config', '$http', function (config, $http, $q) {

    return {
        get: get,
        set: set,
        getWithDefs: getWithDefs,
        changeField: changeField,
    };

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

    function set (subj, data) {
        return $http.post(config.BASE_SERVER_URL + 'set', {
            subj: subj,
            data: data
        }).then(function (response) {
            return response.data;
        })
        .catch(function (err) {
            // alert('Something went wrong!');
            console.log('getSupplies err = ', err);
        });
    }

    function getWithDefs(subj) {
        return get(subj+'&columnDefs');
    }

    function changeField(rowEntity, field, newValue) {
        console.log('changeField()');
    }
}])
})();