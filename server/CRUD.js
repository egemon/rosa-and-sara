var isDev = process.env.NODE_ENV !== 'production';
console.log('isDev = ', isDev);

var express = require('express');
var router = express.Router();
var pgApi = require('./pg/myPgApi');


// ==================== BASE for ANGULAR ==============
router.get('/', function(req, res) {
	console.log('[ROUTER] get for', req.url);
	isDev = true;
	res.render(isDev ? 'dev.html' : 'index.html');
});

function handleQueryResult(res, data) {
	console.log('handleQueryResult', data);
	result = data.rows;

	// TODO: Add error handling
	res.send(result);

}

// TODO refactor with /:table
router.delete('/data', function (req, res) {
	console.log('delete set', req.body);
	pgApi.delete(req.body.table, req.body.ids)
		.then(handleQueryResult.bind(null, res), function (err) {
			res.status(400).send(err);
		});

});

router.put('/data', function (req, res) {
	console.log('put for data');
	pgApi.create(req.body.table, req.body.items)
		.then(handleQueryResult.bind(null, res), function (err) {
			res.status(400).send(err);
		});

});

router.get('/data', function (req, res) {
	console.log('get params', req.query);

	try {
		req.query.ids = JSON.parse(req.query.ids);
	} catch(e){}
	try {
		req.query.options = JSON.parse(req.query.options);
	} catch(e){}

	pgApi.read(req.query.table, req.query.ids, req.query.options)
		.then(function (resp) {
			if (resp.success) {
				res.send(resp);
			}
		}, function (err) {
			res.status(400).send(err);
		});

});

router.patch('/data', function (req, res) {
	console.log('patch set', req.body);
	pgApi.update(req.body.table, req.body.items, req.body.ids)
		.then(handleQueryResult.bind(null, res), function (err) {
			res.status(400).send(err);
		});

});

router.post('/data', function (req, res) {
	console.log('post data', req.body);
	pgApi.execute(req.body.query)
		.then(handleQueryResult.bind(null, res), function (err) {
			res.status(400).send(err);
		});

});



module.exports = router;