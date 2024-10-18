import Express from "express";
import { param } from "express-validator";
import {  getRestaurant, searchRestaurant } from "../controller/RestaurantController";

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
router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("id param must be a valid string"),
    getRestaurant
);
export default router;