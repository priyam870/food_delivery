const router = require('express').Router();
const adminController = require('../controllers/admin');
const middleware = require('../../middleware/verifyAuth');
const admin = require('../../Models/admin');

router.post('/signup', adminController.register);//Admin signUp API
router.post('/login', adminController.login);//Admin login API

router.get('/getAdvertisements', middleware.verifyAuth(admin), adminController.getAdvertisements);
// above route is used for getting all the approved advertisements 

router.put('/approve', middleware.verifyAuth(admin), adminController.approve);
//above route is used to approve or reject advertisements by admin

module.exports = router;