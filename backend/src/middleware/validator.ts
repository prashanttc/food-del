import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handlevalidationError = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export const ValidateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("name must be string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("addressLine must be string"),
  body("city").isString().notEmpty().withMessage("city must be string"),
  handlevalidationError,
];
export const validateMyRestaurant = [
  body("restaurantName").notEmpty().withMessage("name required"),
  body("city").isString().notEmpty().withMessage("city required"),
  body("estimatedTime")
    .isFloat({ min: 0 })
    .notEmpty()
    .withMessage("estimated time must be POSITIVE"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .notEmpty()
    .withMessage("delivery price must be POSITIVE"),
  body("cuisines").isArray().notEmpty().withMessage("cuisine  must be array"),
  body("menuItems")
    .isArray()
    .notEmpty()
    .withMessage("menu items  must be array"),
  body("menuItems.*.name")
    .isString()
    .notEmpty()
    .withMessage("menu items name required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .notEmpty()
    .withMessage("menu price name required"),
];
