const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middleware/auth');
// Route to get user info related data
router.get('/user', isAuthenticated, userController.getUserData);

module.exports = router;
