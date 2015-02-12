var express = require('express');
var myAbout = require('../controllers/about.js');
var huffman = require('../controllers/huffman/huffman.js');

var router = express.Router();

var retData = { 
	title: '哈夫曼编码',
	author: 'margaret',
	encodeString: null
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', retData);
});

//Deal posted encoding form
router.post('/Encoding', huffman.encode);

//Deal posted decoding form
router.post('/Decoding', huffman.decode);

//add about module
router.get('/about',myAbout.about);
module.exports = router;