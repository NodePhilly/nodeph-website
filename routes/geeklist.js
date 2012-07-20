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
	geeks = followers;
});

exports.all = function(req, res) {
	res.send(geeks);
};

exports.next = function(req, res) {
	res.send(geeks[0]);
};