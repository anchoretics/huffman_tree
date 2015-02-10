var express = require('express');
var router = express.Router();

var retData = { title: '哈夫曼编码',author: 'margarate' };
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', retData);
});

router.post('/', function(req, res, next) {
	console.dir(req.params.len);
    res.render('index', retData);
});

module.exports = router;
