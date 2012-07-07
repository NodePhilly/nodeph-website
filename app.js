var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer()
  , io = require('socket.io').listen(app);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', routes.index);

var self = this;
app.listen(3000, function() {
  self.twitterfeed = new (require('./twitterfeed'))({
    searchString: '@NodePhilly OR #nodephilly OR #nodejs',
    filterString: 'nodephilly,nodejs',
    cacheLimit: 3
  });

  self.twitterfeed.init(function() {
    io.sockets.on('connection', function(socket) {
      self.twitterfeed.getCachedTweets().forEach(function(tweet) {
        socket.emit('tweet', tweet);
      });
    });

    self.twitterfeed.stream(function(tweet) {
      console.log(tweet);
    });
  });
});