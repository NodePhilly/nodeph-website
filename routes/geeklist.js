var feed = (require('geeklist')).create({
		  consumer_key: process.env.GEEKLIST_CONSUMER_KEY,
		  consumer_secret: process.env.GEEKLIST_CONSUMER_SECRET
		})
	, geeks = [];

feed.auth({
  token: process.env.GEEKLIST_AUTH_TOKEN,
  secret: process.env.GEEKLIST_AUTH_SECRET
});

feed.users('nodephilly').followers(function(err, followers) {
	geeks = [];

	followers.forEach(function(follower) {
		if (follower.bio) {
			geeks.push(follower);
		}
	});
});

exports.next = function(req, res) {
	var numGeeks = req.param('numGeeks');

	if (!numGeeks) {
		numGeeks = 1;
	}

	var list = [];
	for (var i = 0; i < numGeeks; i++) {
		list.push(geeks[randomIntBetween(0, geeks.length -1 )]);
	}

	res.send(list);
};

function findIndex(list, predicate) {
	for (var i = 0; i < list.length; i++) {
		if (predicate(list[i])) {
			return i;
		}
	}
	return -1;
};

function randomIntBetween(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
};