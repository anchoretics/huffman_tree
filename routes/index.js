var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',author: 'anchoretic@vip.qq.com' });
});
router.get('/help',function(req, res, next){
  console.log(req.xhr);
  res.render('help/help',{ title: 'Help Title',author: ''});
});
router.get('/help/:id?',function(req, res, next){
  console.dir(req.path);
  res.send(req.path);
});
module.exports = router;
