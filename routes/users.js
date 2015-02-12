var express = require('express');
var users = require('../controllers/user/users.js');
var router = express.Router();

/* GET users index. */
router.get('/', users.list);

router.get('/:id?', users.user);

module.exports = router;