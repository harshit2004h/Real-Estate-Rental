import express, { Router } from "express";
import {
  getTenant,
  createTenant,
  updateTenant,
  getCurrentResidences,
  addFavoriteProperty,
  removeFavoriteProperty,
  getPaymentHistory,
  getReviewsByTenant,
  giveReviewToProperty,
  getPaymentHistoryByProperty,
} from "../controllers/tenantControllers";

const router: Router = express.Router();

router.get("/:cognitoId", getTenant);
router.put("/:cognitoId", updateTenant);
router.get("/:cognitoId/current-residences", getCurrentResidences);
router.post("/:cognitoId/favorites/:propertyId", addFavoriteProperty);
router.delete("/:cognitoId/favorites/:propertyId", removeFavoriteProperty);
router.post("/", createTenant);
router.get("/:cognitoId/payments", getPaymentHistory);
router.get("/:cognitoId/reviews", getReviewsByTenant);
router.post("/:cognitoId/reviews/:propertyId", giveReviewToProperty);
router.get(
  "/:cognitoId/paymentsHistory/:propertyId",
  getPaymentHistoryByProperty
);

export default router;
