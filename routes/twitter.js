var TwitterFeed = new (require('twitterfeed'))({
  searchString: '@NodePhilly OR #nodephilly OR #nodejs',
  filterString: 'nodephilly,nodejs',
  cacheLimit: 10
});

var feed = TwitterFeed.start()
  , noop = function(){};
  
feed.on('error', function(error) { console.log('ERROR :: %s', JSON.stringify(error)); });
feed.on('tweet', noop);
feed.on('destroy', noop);
feed.on('end', noop)

exports.next = function(req, res) {
  var tweets = TwitterFeed.getCachedTweets()
    , numTweets = req.param('numTweets');

  if (!numTweets) {
    numTweets = 1;
  }

  var list = [];
  for (var i = 0; i < numTweets; i++) {
    list.push(tweets[randomIntBetween(0, tweets.length -1 )]);
  }

  res.send(list);
};

function randomIntBetween(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
};