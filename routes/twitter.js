var feed = new (require('twitterfeed'))({
  searchString: '@NodePhilly OR #nodephilly OR #nodejs',
  filterString: 'nodephilly,nodejs',
  cacheLimit: 3
});

feed.init(function() {
  feed.stream(
    function() {}, // tweet handler
    function() {}  // callback
  );
});

exports.all = function(req, res) {
  res.send(feed.getCachedTweets());
};

exports.next = function(req, res) {
  res.send(feed.getCachedTweets()[0]);
};