import express from "express";
import {
  createProperty,
  getProperty,
  getProperties,
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

export default router;
