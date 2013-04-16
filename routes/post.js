
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
