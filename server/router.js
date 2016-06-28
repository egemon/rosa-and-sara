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

router.post('/get', function(req, res) {
    console.log('[ROUTER] post for', req.url);
    res.send(dataBase.get(req.body.subj));
});

router.post('/set', function(req, res) {
    console.log('[ROUTER] post for', req.url);
    res.send(dataBase.set(req.body.subj, req.body.data));
});

module.exports = router;