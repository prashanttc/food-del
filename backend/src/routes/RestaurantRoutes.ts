import Express from "express";
import { param } from "express-validator";
import { searchRestaurant } from "../controller/RestaurantController";

const router = Express.Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("city param must be a valid string"),
    searchRestaurant
);
export default router;
