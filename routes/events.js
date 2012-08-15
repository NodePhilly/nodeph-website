var nano = require('nano')(process.env.COUCHDB_URI || 'http://localhost:5984');

exports.index = function(req, res) {
	var db = nano.use('nodephilly');

	db.list({ include_doc: true }, function(err, events) {
		if (err) {
			return console.log('ERROR :: %s', JSON.stringify(err));
		}

		res.render('events', events);
	});
};

exports.month = function(req, res) {
	var db = nano.use('nodephilly');

	db.view('events', 'all', function(err, body) {
		if (err) {
			return console.log('ERROR :: %s', JSON.stringify(err));
		}

		var year = req.param('year')
		  , month = req.param('month')
		  , events = [];

		body.rows.forEach(function(e) {
			console.log(JSON.stringify(e));
			var startTime = new Date(Date.parse(e.value.startTime));
			
			if (startTime.getFullYear() == year && startTime.getMonth() == month) {
				var endTime = Date.parse(e.value.endTime);

				events.push(e.value);
			}
		});

		res.send(events);
	});	
};