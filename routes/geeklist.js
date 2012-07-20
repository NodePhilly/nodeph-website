var feed = (require('geeklist')).create({
		  consumer_key: '9WbN1ldj1TCrMFvXUURDOOhMgso',
		  consumer_secret: 'KMkY0iWYzHauUwaglN0LX8vFvIKaglM-NNFLqssMB5g'
		})
	, geeks = [];

feed.auth({
  token: 'PNjjzkGdWBpuVmbA7HRtijECazc',
  secret: 'x3Zz-dxd4kx7b9qjwkS-OODfYhOaUmVUeJg2h6dXj_k'
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