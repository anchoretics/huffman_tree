var express = require('express');
var fs = require('fs');

var router = express.Router();

var retData = { 
	title: '哈夫曼编码',
	author: 'margarate',
	encodeString: null
};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', retData);
});

//Deal posted encoding form
router.post('/Encoding', function(req, res, next) {
	//if posted encodeString is not null,then do Encoding & send to Client
	if(req.body.encodeString){
		var encodeString = req.body.encodeString;
		//set HTTP Header,then u can send string as a file named 'encode.txt', in this demo
		res.set({
			'Content-Type': 'text/plain',
			'Content-Disposition': 'attachment; filename="encode.txt"'
		});
		//
		res.send(encodeString);
		retData.encodeString = encodeString+'--';
	}else{
		res.render('index', retData);
	}

});

//Deal posted decoding form
router.post('/Decoding', function(req, res, next) {
	if(req.files.encodeFile){
		console.dir(req.files);
		var originalname = req.files.encodeFile.originalname;
		var path = req.files.encodeFile.path;

	}else{
    	res.render('index', retData);
	}
});

module.exports = router;