import express from "express"
import jwtCheck, { jwtParse } from "../middleware/auth"
import { createCheckoutSession, webhookHandler } from "../controller/OrderController"

const router = express.Router()

router.post("/checkout/create-checkout-session",jwtCheck,jwtParse,createCheckoutSession)
router.post("/checkout/webhook",webhookHandler)
export default router;