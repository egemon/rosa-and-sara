var isDev = process.argv[2] === 'dev' ? true : false;
console.log('isDev = ', isDev);

var express = require('express');
var router = express.Router();


// ==================== BASE for ANGULAR ==============
router.get('/*', function(req, res) {
    console.log('[ROUTER] get for', req.url);
    res.render(isDev ? 'dev.html' : 'index.html');
});

router.post('/supplies', function(req, res) {
    console.log('[ROUTER] post for', req.url);
    res.send([
        {
            date: '2016-01-01',
            rule: {
                dmitriy: 33.3,
                olya: 33.3,
                vasya: 33.3,
            },
            goodListId: 1
        },{
            date: '2016-01-02',
            rule: {
                dmitriy: 33.3,
                olya: 33.3,
                vasya: 33.3,
            },
            goodListId: 1
        },{
            date: '2016-01-03',
            rule: {
                dmitriy: 33.3,
                olya: 33.3,
                vasya: 33.3,
            },
            goodListId: 1
        },{
            date: '2016-01-04',
            rule: {
                dmitriy: 33.3,
                olya: 33.3,
                vasya: 33.3,
            },
            goodListId: 1
        },
    ]);
});

module.exports = router;