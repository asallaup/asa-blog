
// Database 

// var databaseUrl = "mongodb://heroku_app14860535:5m6sakelue5j3i4c2p7dq2ui4d@ds031567.mongolab.com:31567/heroku_app14860535" 
var databaseUrl = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'blog2'
  , collections = ["posts"]
  , db = require('mongojs').connect(databaseUrl, collections);



/*
 * Get new blog post form.
 */

function showPosts(req, res){
	db.posts.find().sort({ date: -1 }, function(err, posts) {
		res.render('post/list', { p: posts});
	});
}

exports.list = function(req, res){
	showPosts(req, res);
};

exports.newentry = function(req, res){
	req.body.date = new Date();
	db.posts.insert(req.body);
	showPosts(req, res);
};

exports.difi = function(req, res1){
	require('http').request({
		host: 'hotell.difi.no'
	  ,	port: 80
	  , path: '/api/json/bergen/dokart?'
	  , method: 'GET'
	}, function (res) {
		var body = '';
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log(chunk);
			body += chunk;			
		});
		res.on('end', function () {
			res1.send(body);
		});
	}).end();
};

