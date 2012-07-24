var async = require('async')
  , gklst = (require('geeklist')).create();

// load all geeklist followers
var geeks = []
	, recordsPage = 0
  , recordsPerCall = 50
  , lastRetrievedCount = 50;

async.whilst(
	function() { return lastRetrievedCount == recordsPerCall; },
	
	function(callback) {
		gklst.users('nodephilly').followers({ count: recordsPerCall, page: ++recordsPage }, function(err, followers) {
			lastRetrievedCount = followers.length;

			geeks = geeks.concat(followers);

			callback();
		});
	},

	function(err) {
		console.log('loaded %s geeklist followers', geeks.length);
	}
);

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