const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/UserController');
const { route } = require('./posts');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
module.exports = router;