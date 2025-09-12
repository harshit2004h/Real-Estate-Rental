import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import {
  getLeaseById,
  getLeasePayements,
  getLeases,
} from "../controllers/leaseControllers";

const router = express.Router();

router.get("/", AuthMiddleware(["manager", "tenant"]), getLeases);
router.get(
  "/:id/payments",
  AuthMiddleware(["manager", "tenant"]),
  getLeasePayements
);
router.get("/:id", AuthMiddleware(["manager", "tenant"]), getLeaseById);
export default router;
