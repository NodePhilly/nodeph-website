var allEvents = require('../data/events.json');

exports.index = function(req, res) {
	var year = req.param('year')
	  , month = req.param('month')
	  , events = [];

	allEvents.forEach(function(e) {
		var startTime = new Date(Date.parse(e.startTime));
		
		if (startTime.getFullYear() == year && startTime.getMonth() == month) {
			var endTime = Date.parse(e.endTime);

			events.push(e);
		}
	});

	res.send(events);
};