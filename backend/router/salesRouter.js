import { Router } from "express";
import { addPayment, getAllpayemt } from "../controller/salesController.js";
import { addOrder, getOrdersByUser, paymentSession } from "../controller/paymentcontroller.js";

const router = Router();

router.route("/addpayment").post(addPayment);
router.route("/getallpayment").get(getAllpayemt);
router.route('/user/:userId/orders').get(getOrdersByUser);
router.route("/addOrder").post(addOrder);
router.route("/payment").post(paymentSession);

export default router;
