const router = require('express').Router();

router.use('/user', require('./user'));//requiring user routes
router.use('/admin', require('./admin'));//requiring user routes

module.exports = router;