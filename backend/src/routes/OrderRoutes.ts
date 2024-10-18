import express from "express"
import jwtCheck, { jwtParse } from "../middleware/auth"
import { createCheckoutSession, getMyOrder, webhookHandler } from "../controller/OrderController"

const router = express.Router()

router.post("/checkout/create-checkout-session",jwtCheck,jwtParse,createCheckoutSession)
router.get("/",jwtCheck,jwtParse,getMyOrder)
router.post("/checkout/webhook",webhookHandler)
export default router;