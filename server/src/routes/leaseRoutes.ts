import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { getLeasePayements, getLeases } from "../controllers/leaseControllers";

const router = express.Router();

router.get("/", AuthMiddleware(["manager", "tenant"]), getLeases);
router.get(
  "/:id/payments",
  AuthMiddleware(["manager", "tenant"]),
  getLeasePayements
);

export default router;
