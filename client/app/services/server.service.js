(function () { angular.module('base')
.service('serverSrv', ['config', '$http','toaster' ,
function (config, $http, toaster) {

    return {
        create: create,
        read: read,
        update: update,
        delete: remove
    };


    function create (table, items) {
        console.log('[server.service] create()', arguments);

        var data = {
            table: table,
            items: removeNulls(items)
        };

        return $http({
            method: 'POST',
            url: config.BASE_SERVER_URL + config.DATA_URL,
            data: data,
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
            .catch(failCallback.bind(this, 0))
            .then(handleData.bind(this, table));
    }

    function read (table, ids, params) {
        console.log('[server.service] create()', arguments);

        var data = {
            table: table,
            ids: ids,
            options: params
        };

        return $http({
            method: 'GET',
            url: config.BASE_SERVER_URL + config.DATA_URL,
            params: data,
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
            .catch(failCallback.bind(this, 0))
            .then(handleData.bind(this, table));
    }

    function update (table, items, ids) {
        console.log('[server.service] create()', arguments);

        var data = {
            table: table,
            items: removeNulls(items),
            ids: ids
        };

        return $http({
            method: 'PATCH',
            url: config.BASE_SERVER_URL + config.DATA_URL,
            data: data,
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
            .catch(failCallback.bind(this, 0))
            .then(handleData.bind(this, table));
    }

    function remove (table, ids) {
        console.log('[server.service] delete()', ids);

        var data = {
            table: table,
            ids: ids
        };

        return $http({
            method: 'DELETE',
            url: config.BASE_SERVER_URL + config.DATA_URL,
            data: data,
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        })
            .catch(failCallback.bind(this, 0))
            .then(handleData.bind(this, table));
    }


    //=============== HELPERS =========

    function removeNulls(item) {
        if (_.isArrayLike(item)){
            return _.map(item, removeNulls);
        } else {
            return _.mapValues(item, function (val) {
                if (val === 0) {
                    return val;
                } else {
                    return val || undefined;
                }
            });
        }
    }

    function failCallback (data, err) {
        console.error('[ServerSrv] Error, ', err);
        toaster.error(err);

    }

    function handleData (table, response) {
        return response.data;
    }

}])
})();