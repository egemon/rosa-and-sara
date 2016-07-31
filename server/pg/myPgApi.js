var _ = require('lodash');
var Record = require('./record.js');
var Connection = require('./connection');



// CRUD-M
var method = {
    "create": "save",
    "read": "reload",
    "update": "update",
    "delete": "destroy",

    // TODO remove aftet rewriting of pg-lib
    "getAll": "getAll",
    "getBy": "getBy"
};

function read(table, ids, params) {
    console.log('[pgApi]', arguments);
    var options;
    var all = ids === 'all';
    var getBy = _.isPlainObject(ids);
    var name = all ? 'getAll' : 'read';
    if (getBy) {
        options = ids;
        name ='getBy';
    }
    return make(method[name], table, ids, ids, options, params).then(function (data) {
        if (all || getBy) {
            return data[0];
        }
        return data;
    });
}

//TODO: implement deleting by filter
function del (table, ids) {
    console.log('[pgApi] create()', arguments);
    var query = `delete from ${table} where `;

    if (_.isArrayLike(ids)) {
        _.each(ids, function (id, i) {
            query += ` id = ${id}`;
            if (_.last(ids) !== id) {
                query += ' || ';
            }
        });
    }

    if (_.isNumber(ids)) {
        query += ` id = ${ids}`;
    }
    var connection = new Connection(query + ' returning *;');
    return connection.execQuery();
}

//
// function create(table, items) {
//     return make(method.create, table, items);
// }

function create (table, items) {
    console.log('[pgApi] create()', arguments);
    var query = `insert into ${table} `;

    //assuming all items have the same structure
    if (_.isArrayLike(items)) {
        console.log('[pgApi] isArrayLike()', items);
        query += ` (${_.keys(items[0]).join()}) values `;
        _.each(items, function (item, i) {


            query += ` (${_.values(_escapeValues(item)).join()}) `;
            if (_.last(items) !== item) {
                query += ' , ';
            }
        });
    }

    if (_.isPlainObject(items)) {
        console.log('[pgApi] isPlainObject()', items);
        query += ` (${_.keys(items).join()}) values `;
        query += ` (${_.values(_escapeValues(items)).join()}) `;
    }

    console.log('[pgApi] query ', query);
    var connection = new Connection(query + ' returning *;');
    return connection.execQuery();
}

function _escapeValues (object) {
    return _.mapValues(object, function (value) {
        return _.isNumber(value) ? value : ` '${value}' `;
    })
}


// function del(table, ids) {
//     return make(method.delete, table, ids, ids);
// }

function update(table, items, ids) {
    console.log('ids', ids);
    return make(method.update, table, items, ids);
}

function make(cmd, table, items, ids, filters, params) {
    "use strict";
    items = toArray(items);
    ids = toArray(ids);
    var results = [];
    return items.reduce(function (promise, item, i) {
        var id = ids && ids.length && ids[i];
        return promise.then(function () {
            class BaseUser extends Record {
              constructor(){
                super(table, item, id);
              }
            }
            var user = new BaseUser();
            var result = user[cmd](filters, params).then(function (data) {
                console.log('Succses ' + cmd + ': ', item, data);
                return {success: 1, data: data, item: item};
            },function (err) {
                console.log('Error: ' + id, err);
                return {item: item, id: id};
            });
            results.push(result);
            return result;
        }, function (err) {
            results.push(err);
            console.log('err', err);
        });
    }, Promise.resolve())
    .then(function () {
        // console.log('endSuccses', res);
        return Promise.all(results);
    }, function (err) {
        console.log('errInTheEnd', err);
        return Promise.all(results);
    });
}


function toArray(items) {
    return items instanceof Array ? items : items === undefined ? undefined : [items];
}

module.exports = {
    create: create,
    read: read,
    update: update,
    delete: del,
    make: make
};