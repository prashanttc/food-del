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
