import express from "express";
import {
  getProperties,
  getProperty,
  createProperty,
  getPropertyLeases,
  getPropertyReviews,
  getPropertyPaymentHistory,
} from "../controllers/propertyControllers";
import multer from "multer";
import { AuthMiddleware } from "../middlewares/authMiddleware";

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
router.get(
  "/:propertyId/leases",
  AuthMiddleware(["manager"]),
  getPropertyLeases
);
router.get("/:propertyId/reviews", getPropertyReviews);
router.get(
  "/:propertyId/paymentsHistory",
  AuthMiddleware(["manager"]),
  getPropertyPaymentHistory
);

export default router;
