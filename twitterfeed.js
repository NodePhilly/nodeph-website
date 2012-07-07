var consumer_key = process.env.TWITTER_CONSUMER_KEY
  , consumer_secret = process.env.TWITTER_CONSUMER_SECRET
  , access_token_key = process.env.TWITTER_ACCESS_TOKEN_KEY
  , access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

if (consumer_key && consumer_secret && access_token_key && access_token_secret) {
	var twitter = require('ntwitter')
	  , twit = new twitter({
	  	consumer_key: consumer_key,
	  	consumer_secret: consumer_secret,
	  	access_token_key: access_token_key,
	  	access_token_secret: access_token_secret
	  });

	twit.search('@NodePhilly OR #nodephilly', {}, function(err, data) {
		console.log(data);
	});
} else {
	console.log('====================================');
	console.log('ERROR :: invalid twitter credentials');
	console.log('====================================');
	console.log('consumer_key = %s', consumer_key);
	console.log('consumer_secret = %s', consumer_secret);
	console.log('access_token_key = %s', access_token_key);
	console.log('access_token_secret = %s', access_token_secret);
	console.log('====================================');
}
