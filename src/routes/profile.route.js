const express = require('express');
const router = express.Router();
const { createProfile, getProfile, editProfile } = require('../controllers/profile.controller')
const { validateToken } = require('../middleware/auth.middleware')

router.post('/', validateToken, createProfile)
router.get('/', validateToken, getProfile )
router.put('/edit', validateToken, editProfile )

module.exports = router