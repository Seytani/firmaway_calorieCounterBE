const express = require('express');
const router = express.Router();
const { signup, login, me } = require('../controllers/user.controller')
const {validateToken} = require('../middleware/auth.middleware')

/* GET users listing. */
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', validateToken, me);

module.exports = router;
