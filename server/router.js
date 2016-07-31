var isDev = process.env.NODE_ENV !== 'production';
// isDev = true;
console.log('isDev = ', isDev);

var express = require('express');
var router = express.Router();
var dataBase = require('./dataBase');


// ==================== BASE for ANGULAR ==============
router.get('/*', function(req, res) {
    console.log('[ROUTER] get for', req.url);
    isDev = true;
    res.render(isDev ? 'dev.html' : 'index.html');
});

router.post('/get', function(req, res) {
    console.log('[ROUTER] post for', req.url);
    console.log('req.body.subj', req.body.subj);
    if (req.body.subj.indexOf('&') > -1) {
        var subj = req.body.subj.split('&')[0];
        var resp = dataBase.get('gridOptions');
        resp.data = dataBase.get(subj);
        resp.columnDefs = dataBase.get(subj+'-columnDefs');
        res.send(resp);
    } else {
        res.send(dataBase.get(req.body.subj));
    }
});

router.post('/set', function(req, res) {
    console.log('[ROUTER] post for', req.url);
    res.send(dataBase.set(req.body.subj, req.body.data));
});

module.exports = router;