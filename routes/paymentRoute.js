const router = require("express").Router();
const paymentControllers = require("../controllers/paymentControllers")

router.post('/fees', paymentControllers.feeConfig);

module.exports = router