import express from "express";
import {
  CreateCurrentUser,
  GetCurrentUser,
  UpdateCurrentUser,
} from "../controller/MyUserController";
import jwtCheck, { jwtParse } from "../middleware/auth";
import { ValidateMyUserRequest } from "../middleware/validator";

const router = express.Router();

router.get("/", jwtCheck,jwtParse , GetCurrentUser );
router.post("/", jwtCheck, CreateCurrentUser);
router.put("/", jwtCheck, jwtParse, ValidateMyUserRequest, UpdateCurrentUser);

export default router;
