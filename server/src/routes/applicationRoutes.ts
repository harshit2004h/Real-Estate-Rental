import express, { Router } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import {
  getApplicationById,
  listApplications,
  updateApplicationStatus,
} from "../controllers/applicationControllers";

const router: Router = express.Router();

router.get("/:id", AuthMiddleware(["tenant"]), getApplicationById);
router.put("/:id/status", AuthMiddleware(["manager"]), updateApplicationStatus);
router.get("/", AuthMiddleware(["manager", "tenant"]), listApplications);

export default router;
