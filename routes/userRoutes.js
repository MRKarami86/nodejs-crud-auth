const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js'); // مسیر درست
const auth = require('../middleware/authMiddleware'); // مسیر درست

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/me', auth, userController.getProfile);
router.put('/me', auth, userController.updateProfile);
router.delete('/me', auth, userController.deleteProfile);

module.exports = router;
