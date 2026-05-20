const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authControllers');
const authMiddleware = require('../middleware/authmiddleware');

/**
 * @route POST api/auth/register
 * @desc register a new user and return token in cookie
 * @access Public
 */

authRouter.post('/register', authController.register);

/** 
 * @route POST api/auth/login
 * @desc login user and return token in cookie
 * @access Public
 */
authRouter.post('/login', authController.login);

/**
 * @route GET api/auth/logout
 * @desc clear the token from the user cookie and add it to the blacklist
 * @access Public
 */

authRouter.get('/logout', authController.logout);

/**
 * @route GET api/auth/get-me
 * @desc get the current logged in user deatails
 * @access Private
 */

authRouter.get('/get-me', authMiddleware, authController.getMe);

module.exports = authRouter;