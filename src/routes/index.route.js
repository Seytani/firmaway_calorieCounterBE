const express = require('express');
const router = express.Router();
const userRouter = require('./users.route')
const profileRouter = require('./profile.route')
const entryRouter = require('./entry.route')

router.use('/user', userRouter)
router.use('/profile', profileRouter)
router.use('/entry', entryRouter)

/* GET home page. */
router.get('/', function(req, res, next) {
});

module.exports = router;
