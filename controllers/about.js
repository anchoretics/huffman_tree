var myAbout = {

	about : function(req, res){
		//res.send("Hello About !");
		var ret = {
			content: 'This is Margaret\'s persional website',
			copyright: 'Margaret 2015'
		};
		res.render('about', ret);
	}
};

module.exports = myAbout;