exports.index = function(req, res) {
	var year = req.param('year')
	  , month = req.param('month')
	  , day = 1 + Math.random() * (28 - 1);

	res.send([{
		date: new Date(year, month, day).getTime(),
		title: 'Node.Philly July Meetup',
		startTime: '7:00 PM',
		endTime: '10:00 PM',
		type: 'meetup',
		description: 'Our monthly meetup for July will be held at the Center for Architecture.'
	}]);
};