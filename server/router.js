var isDev = process.argv[2] === 'dev' ? true : false;
console.log('isDev = ', isDev);

var express = require('express');
var router = express.Router();
var dataBase = require('./dataBase');


// ==================== BASE for ANGULAR ==============
router.get('/*', function(req, res) {
    console.log('[ROUTER] get for', req.url);
    res.render(isDev ? 'dev.html' : 'index.html');
});

router.post('/supplies', function(req, res) {
    console.log('[ROUTER] post for', req.url);
    res.send(dataBase.getSupplies());
});

module.exports = router;