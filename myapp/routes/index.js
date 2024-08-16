var express = require('express');
var router = express.Router();
const user = require('../controllers/userController.js');
const post = require('../controllers/postController.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/register", user.getRegister);
router.post("/register", user.register);
router.get("/login", user.getLogin);
router.post("/login", user.login);
router.get("/post", post.getPost);
router.get("/profile", user.getProfile);
router.post("/post", post.userPost);

module.exports = router;
