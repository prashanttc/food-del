import  express  from "express";
import { param } from "express-validator";
import multer from "multer";
import { CreateMyResturant, GetMyRestaurant, MyRestaurantOrders, UpdateMyRestaurant } from "../controller/MyRestaurantController";
import jwtCheck, { jwtParse } from "../middleware/auth";
import { validateMyRestaurant } from "../middleware/validator";
import { UpdateOrderStatus } from "../controller/MyRestaurantController";

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({
    storage:storage,
    limits:{
        fieldSize: 5 * 1024 * 1024  //5mb
    }
})
//api/my/rresturant
router.get("/",jwtCheck,jwtParse,GetMyRestaurant)
router.patch("/order/:orderId/status",param("orderId")
.isString()
.trim()
.notEmpty()
.withMessage("id param must be a valid string"), jwtCheck,jwtParse,UpdateOrderStatus)
router.post("/",validateMyRestaurant,jwtCheck,jwtParse,upload.single("imageFile"),CreateMyResturant )
router.put("/",validateMyRestaurant,jwtCheck,jwtParse,upload.single("imageFile"),UpdateMyRestaurant )
router.get("/order",jwtCheck,jwtParse,MyRestaurantOrders)
export default router;