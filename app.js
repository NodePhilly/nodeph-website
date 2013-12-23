var express = require('express')
  , routes = require('./routes/index')
  , events = require('./routes/events')
  , partners = require('./routes/partners')
  , gallery = require('./routes/gallery')
  , connect = require('./routes/connect')
  , tweets = require('./routes/twitter')
  , geeks = require('./routes/geeklist')
  , ptw2013 = require('./routes/ptw2013')
  , sponsorship = require('./routes/sponsorship')
  , stylus = require('stylus')
  , hackandhops = require('./routes/hackandhops');

var nano = require('nano')(process.env.COUCHDB_URI || 'http://localhost:5984');

nano.db.list(function(err, body) {
  if (err) {
    return console.log('ERROR :: %s', JSON.stringify(err));
  }

  if (body === null || body.indexOf('nodephilly') < 0) {
    nano.db.create('nodephilly', function(err, body) {
      if (err) {
        return console.log('ERROR :: %s', JSON.stringify(err));
      }

      var db = nano.db.use('nodephilly');

      db.insert({
        'views': {
          'all': {
            'map': function(doc) {
              emit(doc._id, doc);              
            }
          }
        } 
      }, '_design/events', function(err, body) {
        (require('./data/events.json')).forEach(function(e) {
          db.insert(e, function(err, body) {
            if (err) {
              return console.log('ERROR :: %s', JSON.stringify(err));
            }            
          });
        });  

        console.log('INFO :: created database "nodephilly"');      
      });
    });
  }

  if (body.indexOf('nodephilly_sponsorship') < 0) {
    nano.db.create('nodephilly_sponsorship', function(err, body) {
      if (err) {
        return console.log('ERROR :: %s', JSON.stringify(err));
      }
      console.log('INFO :: created database "nodephilly_sponsorship"');
    });
  }
});

var app = module.exports = express.createServer();


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
app.get('/hackandhops', hackandhops.index);

app.get('/events', events.index);
app.get('/events/:year/:month', events.month);

app.get('/partners', partners.index);

app.get('/gallery', gallery.index);

app.get('/connect', connect.index);
app.post('/connect', connect.post);

app.get('/geeks/next', geeks.next);
app.get('/geeks/next/:numGeeks', geeks.next);

app.get('/tweets/next', tweets.next);
app.get('/tweets/next/:numTweets', tweets.next);

app.get('/ptw2013', ptw2013.index);

app.get('/sponsorship', sponsorship.index);
app.post('/sponsorship', sponsorship.post);

app.listen(3000, function() {
  console.log('server started on port 3000');
});