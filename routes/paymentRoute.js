const router = require("express").Router();
const paymentControllers = require("../controllers/paymentControllers")

router.post('/fees', paymentControllers.feeConfig);
router.post('/compute-transaction-fee', paymentControllers.transactFee)

module.exports = router