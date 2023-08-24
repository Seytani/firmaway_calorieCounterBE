const express = require('express');
const router = express.Router();
const {validateToken } = require('../middleware/auth.middleware')
const { addEntry, getEntries, editEntry, deleteEntry } = require('../controllers/entry.controller')

router.post('/add', validateToken, addEntry)
router.get('/all', validateToken, getEntries)
router.put('/edit/:id', validateToken, editEntry)
router.delete('/delete/:id', validateToken, deleteEntry)

module.exports = router
