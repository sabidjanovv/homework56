const {Router} = require("express");


const clientRouter = require('./client.routes');
const specialistRouter = require("./specialist.routes");
const adminRouter = require("./admin.routes");
const socialRouter = require("./social.routes");
const otpRouter = require("./otp.routes");
const queueRouter = require('./queue.routes');
const serviceRouter = require("./service.routes");
const specServiceRouter = require('./spec_service.routes');
const specSocialRouter = require('./spec_social.routes');
const specWorkingDayRouter = require('./spec_working_day.routes');
const tokenRouter = require('./token.routes');


const router = Router();


router.use('/client', clientRouter);
router.use("/specialist", specialistRouter);
router.use("/admin", adminRouter);
router.use("/social", socialRouter);
router.use("/otp", otpRouter);
router.use('/queue', queueRouter);
router.use('/service', serviceRouter);
router.use('/spec_service', specServiceRouter);
router.use('/spec_social', specSocialRouter);
router.use('/spec_working_day', specWorkingDayRouter);
router.use('/token', tokenRouter);


module.exports = router;