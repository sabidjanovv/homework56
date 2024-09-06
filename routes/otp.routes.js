const {Router} = require('express');

const { newOTP, verifyOTP } = require('../controllers/otp.controller');

const router = Router();


router.post('/newotp', newOTP);
router.post('/verifyotp', verifyOTP);


module.exports = router;