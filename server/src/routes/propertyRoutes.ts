import express from "express";
import {
  createProperty,
  getProperty,
  getProperties,
  getPropertyPayment,
} from "../controllers/propertyControllers";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getProperty);
router.post(
  "/",
  AuthMiddleware(["manager"]),
  upload.array("photos"),
  createProperty
);
router.get("/:id/payments", AuthMiddleware(["tenant"]), getPropertyPayment);

export default router;
