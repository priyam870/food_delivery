const Router = require('express').Router();
const userController = require('../controllers/user');
const middleware = require('../../middleware');
const user = require('../../Models/user');

Router.post('/signup', userController.signUp);//user signUp API
Router.post('/login', userController.login);//user login API
Router.post('/createAdvertisement', middleware.auth.verifyAuth(user)
    , middleware.multer.upload.single('image'), userController.createAdvertisement);//API for the user to create its advertisements

module.exports = Router;