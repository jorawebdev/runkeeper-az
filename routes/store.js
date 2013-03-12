// handler for homepage
exports.home = function(req, res) {
    // if user is not logged in, ask them to login
    if (typeof req.session.username == 'undefined') res.render('home', { title: 'azStore'});
    // if user is logged in already, take them straight to the items list
    else res.redirect('/items');
};

// handler for form submitted from homepage
exports.home_post_handler = function(req, res) {
    // if the username is not submitted, give it a default of "Anonymous"
    username = req.body.username || 'Anonymous';
    // store the username as a session variable
    req.session.username = username;
    // redirect the user to homepage
    res.redirect('/');
};

// our 'database'
var items = {
    SKN:{name:'Sumatra', price:1.00},
    ASK:{name:'Jerusalem', price:6.90},
    CGI:{name:'Brazil', price:2.50},
    NGT:{name:'Espana', price:2.00},
    KTN:{name:'Java Supreme', price:1.70}
};

// handler for displaying the items
exports.items = function(req, res) {
    // don't let nameless people view the items, redirect them back to the homepage
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else res.render('items', { title: 'azStore - Items', username: req.session.username, items:items });
};

// handler for displaying individual items
exports.item = function(req, res) {
    // don't let nameless people view the items, redirect them back to the homepage
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else {
        var name = items[req.params.id].name;
        var price = items[req.params.id].price;
        res.render('item', { title: 'azStore - ' + name, username: req.session.username, name:name, price:price });
    }
};

// handler for showing simple pages
exports.page = function(req, res) {
    var name = req.query.name;
    var contents = {
        about: 'azStore sells the best coffee in the world. To satisfy your coffee taste shop with us.',
        contact: 'You can contact us at <address><strong>azStore</strong>,<br>1, World Coffee Headquarters,<br>Barista Avenue,<br>Brisbane,<br>CA.</address>'
    };
    res.render('page', { title: 'azStore - ' + name, username: req.session.username, content:contents[name] });
};


// handler redirect for runkeeper token
exports.rktoken = function(req, res) {
    res.render('rktoken', { title: 'azStore - Items', username: req.session.username, items:items });
};

// handler for runkeeper authorization page
exports.rkauth= function(req, res) {
    var urlStr = req.url;
    var authCode = 'null';
    if(urlStr.match('code=')){
      var ar = urlStr.split('=');
      authCode = ar[2];
    }
    res.render('rkauth', { title: 'RunKeeper Authorization', auth_code:authCode});
};


