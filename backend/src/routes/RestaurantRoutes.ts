import  express  from "express";
import multer from "multer";
import { CreateMyResturant, GetMyRestaurant, UpdateMyRestaurant } from "../controller/RestaurantController";
import jwtCheck, { jwtParse } from "../middleware/auth";
import { validateMyRestaurant } from "../middleware/validator";

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
router.post("/",validateMyRestaurant,jwtCheck,jwtParse,upload.single("imageFile"),CreateMyResturant )
router.put("/",validateMyRestaurant,jwtCheck,jwtParse,upload.single("imageFile"),UpdateMyRestaurant )
export default router;