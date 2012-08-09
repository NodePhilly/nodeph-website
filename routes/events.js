var request = require('request');

exports.index = function(req, res) {
	var year = req.param('year')
	  , month = req.param('month');

	request.get('http://www.google.com/calendar/feeds/node.ph_njl3mveagvvfr4g21nbnetd658@group.calendar.google.com/public/full?alt=json&orderby=starttime&singleevents=true&sortorder=ascending&futureevents=true', function(error, request, body) {
		var result = JSON.parse(body)
		  , events = [];

		if (result.feed) {
			if (result.feed.entry) {				
				result.feed.entry.forEach(function(event) {
					
					var startTime = new Date(Date.parse(event.gd$when[0].startTime));
					
					if (startTime.getFullYear() == year && startTime.getMonth() == month) {
						var endTime = Date.parse(event.gd$when[0].endTime);

						events.push({
							title: event.title.$t,
							description: event.content.$t,
							location: event.gd$where[0].valueString,
							startTime: startTime.getTime(),
							endTime: endTime
						});
					}
				});
			}
		}

		res.send(events);
	});	
};