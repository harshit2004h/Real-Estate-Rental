import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import {
  createApplication,
  listApplications,
  updateApplicationStatus,
} from "../controllers/applicationControllers";

const router = express.Router();

router.post("/", AuthMiddleware(["tenant"]), createApplication);
router.put("/:id/status", AuthMiddleware(["manager"]), updateApplicationStatus);
router.get(
  "/:id/status",
  AuthMiddleware(["manager", "tenant"]),
  listApplications
);

export default router;
