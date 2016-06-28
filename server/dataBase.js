
// ==================== BASE for ANGULAR ==============
//
var fs = require('fs');
dataBase = {
    get: get,
    set: set,
}
function get (subject) {
    return JSON.parse(fs.readFileSync('server/data-base/' + subject + '.json'));
}

function set (subject, data) {
    return JSON.parse(fs.writeFileSync('server/data-base/' + subject + '.json', data));
}

module.exports = dataBase;