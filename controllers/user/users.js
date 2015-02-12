var users = {

	list : function(req, res){
		res.send("Hello Users list !").end();
	},
	user : function(req, res){
		var userId = req.params.id;
		res.render('user/list', {userName: 'Hello user:'+userId} );
	}
};

module.exports = users;