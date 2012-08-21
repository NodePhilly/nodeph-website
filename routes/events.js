require('../public/js/date.js'); // what a hack!!!

var nano = require('nano')(process.env.COUCHDB_URI || 'http://localhost:5984');

exports.index = function(req, res) {
	var db = nano.use('nodephilly');

	db.view('events', 'all', function(err, events) {
		if (err) {
			return console.log('ERROR :: %s', JSON.stringify(err));
		}

		res.render('events', {
			events: events.rows
		});
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
			var startTime = new Date(e.value.startTime);
			
			if (startTime.getFullYear() == year && startTime.getMonth() == month) {
				var endTime = Date.parse(e.value.endTime);

				events.push(e.value);
			}
		});

		res.send(events);
	});	
};