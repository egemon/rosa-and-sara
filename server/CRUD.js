/**
 * Created by ilukianov on 31.07.16.
 */
var pgApi = require('./pg/myPgApi');
var router = require('./router');

function handleQueryResult(res, dataArray) {
	console.log('handleQueryResult', dataArray);
	result = dataArray[0];
	if (result.success) {
		res.send(result);
	} else {
		res.status(400).send({
			errorText: 'Data wasn"t deleted'
		});
	}
}

// TODO refactor with /:table
router.delete('/data', function (req, res) {
	console.log('delete set', req.body);
	pgApi.delete(req.body.table, req.body.ids)
		.then(handleQueryResult.bind(null, res), function (err) {
			res.status(400).send(err);
		});

});

router.post('/data', function (req, res) {
	console.log('post for data');
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



module.exports = router;