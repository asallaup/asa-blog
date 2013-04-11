
// Database 

var databaseUrl = "blog"
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

exports.newpost = function(req, res){
    res.render('post/new', { title: 'Express' });
};

exports.list = function(req, res){
	showPosts(req, res);
};

exports.newentry = function(req, res){
	req.body.date = new Date();
	db.posts.insert(req.body);
	showPosts(req, res);
};
