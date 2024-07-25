const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const { signup, login, getUserDetails, logout, getChangePassword } = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', auth, getUserDetails);
router.post('/change_password',auth, getChangePassword);
router.post('/logout', auth, logout);

module.exports = router;
