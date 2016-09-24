var _ = require('lodash');
var Record = require('./record.js');
var Connection = require('./connection');


// =================== NEW PART ====================

function create (table, items) {
    var query = `insert into ${table} `;

    //assuming all items have the same structure
    if (_.isArray(items)) {
        query += ` (${_.keys(items[0]).join()}) values `;
        _.each(items, function (item, i) {


            query += ` (${_.values(_escapeValues(item)).join()}) `;
            if (_.last(items) !== item) {
                query += ' , ';
            }
        });
    }

    if (_.isPlainObject(items)) {
        query += ` (${_.keys(items).join()}) values `;
        query += ` (${_.values(_escapeValues(items)).join()}) `;
    }

    return execute(query, true);
}

//TODO refactore to change needed fields
// function read1 (table, ids, params) {
//     var query = `select *  from ${table} `;
//
//
//     if (ids === 'all' || ids === '*' || _.isUndefined(ids) ) {
//         return execute(query);
//     }
//
//     // Assuming it is array of ids
//     if (_.isArray(ids)) {
//         query += _where(ids, query);
//     }
//
//     if (_.isPlainObject(ids)) {
//
//     }
//
//     return execute(query);
// }

//TODO: implement deleting by filter
function del (table, ids) {
    ids = _parse(ids);

    var query = ` delete from ${table} `;

    // Assuming it is array of ids
    if (_.isArray(ids) || _.isNumber(ids)) {
        query = _where(ids, query);
    }


    if (_.isPlainObject(ids)) {

    }

    return execute(query, true);
}


function execute (query, returning) {
    return (new Connection(query  + (returning ? ' returning *' : '' )+ ' ;')).execQuery();
}


//=========== NEW HELPERS ===============

function _parse (data) {
    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
}

function _where (ids, query) {
    ids = _.isNumber(ids) ? [ids] : ids;
    query += ' where ';
    _.each(ids, function (id) {
        query += ` id = ${id}`;
        if (_.last(ids) !== id) {
            query += ' || ';
        }
    });
    return query;
}

function _escapeValues (object) {
    return _.mapValues(object, function (value) {
        return _.isNumber(value) ? value : ` '${value}' `;
    })
}


// =================== OLD PART ====================

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
        var id = _.isArray(ids) ? ids[i] : ids;
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
    execute: execute,
    make: make
};