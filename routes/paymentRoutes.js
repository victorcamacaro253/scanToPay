import { Router } from "express";
import PaymentController from "../controllers/paymentControllers.js";
const router = Router()

router.post('/payments',PaymentController.createPayment)

router.get('/payments/:paymentId',PaymentController.getPaymentById)

export default router
