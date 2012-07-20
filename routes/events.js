var request = require('request')
  , moment = require('moment');

exports.index = function(req, res) {
	var year = req.param('year')
	  , month = req.param('month');

	request.get('http://www.google.com/calendar/feeds/node.ph_njl3mveagvvfr4g21nbnetd658@group.calendar.google.com/public/full?alt=json&orderby=starttime&singleevents=true&sortorder=ascending&futureevents=true', function(error, request, body) {
		var result = JSON.parse(body)
		  , events = [];

		if (result.feed) {
			if (result.feed.entry) {				
				result.feed.entry.forEach(function(event) {
					var startTime = moment(event.gd$when[0].startTime);
					
					if (startTime.year() == year && startTime.month() == month) {
						var endTime = moment(event.gd$when[0].endTime)
							, date = startTime.format('MM-DD-YYYY');

						events.push({
							title: event.title.$t,
							description: event.content.$t,
							location: event.gd$where[0].valueString,
							date: date,
							startTime: startTime.format('hh:mm A'),
							endTime: endTime.format('hh:mm A')
						});
					}
				});
			}
		}

		res.send(events);
	});	
};