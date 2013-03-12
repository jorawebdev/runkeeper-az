
/**
 * Module dependencies.
 */

var express = require('express'), 
	http = require('http'), 
	path = require('path'),
  url = require ("url");
var store = require('./routes/store');
var runkeeper = require('runkeeper-js');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', store.home);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

app.post('/', store.home_post_handler);

// display the list of item
app.get('/items', store.items);

// show individual item
app.get('/item/:id', store.item);

// show general pages
app.get('/page', store.page);

app.get('/logout', function(req, res) {
    // delete the session variable
    delete req.session.username;
    // redirect user to homepage
    res.redirect('/');
});

// runkeeper authorization page
app.get('/rkauth', store.rkauth);

// runkeeper redirect to token url with post
app.get('/rktoken', store.rktoken);



/*
Client ID:
4d0d3daf0f604b85a48336400d76a407
This value is the OAuth 2.0 client ID for your application.

Client Secret:
b604b5a6e7fa4a7ea1bbebdaee90e2b6
This value is the OAuth 2.0 shared secret for your application.

Authorization URL:
https://runkeeper.com/apps/authorize
This is the URL to which your application should redirect the user in order to authorize access to his or her RunKeeper account.

Access Token URL:
https://runkeeper.com/apps/token
This is the URL at which your application can convert an authorization code to an access token.

De-Authorization URL:
https://runkeeper.com/apps/de-authorize
*/




