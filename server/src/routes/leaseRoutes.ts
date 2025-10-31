import express, { Router } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import {
  getLeaseById,
  getLeases,
} from "../controllers/leaseControllers";

const router: Router = express.Router();

router.get("/", AuthMiddleware(["manager", "tenant"]), getLeases);
router.get("/:id", AuthMiddleware(["manager", "tenant"]), getLeaseById);
export default router;
