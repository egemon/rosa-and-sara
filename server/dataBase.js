
// ==================== BASE for ANGULAR ==============
//
var fs = require('fs');
dataBase = {
    getSupplies: getSupplies,
    setSupplies: setSupplies,
}


function getSupplies () {
    return JSON.parse(fs.readFileSync('server/data-base/suplies.json'));
}

function setSupplies () {

}

module.exports = dataBase;