import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import {
  capturePayment1,
  verifyPayment1,
  capturePayment2,
  verifyPayment2,
} from "../controllers/paymentControllers";

const router = express.Router();

router.post("/capture1", AuthMiddleware(["tenant"]), capturePayment1);
router.post("/verify1", AuthMiddleware(["tenant"]), verifyPayment1);
router.post("/capture2", AuthMiddleware(["tenant"]), capturePayment2);
router.post("/verify2", AuthMiddleware(["tenant"]), verifyPayment2);

export default router;
