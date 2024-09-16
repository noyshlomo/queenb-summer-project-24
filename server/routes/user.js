const express = require('express');

const {loginProcess , signupProcess} = require('../controllers/userController')

const router = express.Router();

/**
 * Read and Write Permission Routes
 */

//login route
router.post('/login', loginProcess)

//register route
router.post('/signup', signupProcess)

module.exports = router