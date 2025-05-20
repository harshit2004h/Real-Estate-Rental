import express from "express";
import {
  getTenant,
  createTenant,
  updateTenant,
  getCurrentResidences,
  addFavouriteProperty,
  removeFavouriteProperty,
} from "../controllers/tenantControllers";

const router = express.Router();

router.get("/:cognitoId", getTenant);
router.put("/:cognitoId", updateTenant);
router.get("/:cognitoId/current-residences", getCurrentResidences);
router.post("/:cognitoId/favourites/:propertyId", addFavouriteProperty);
router.delete("/:cognitoId/favourites/:propertyId", removeFavouriteProperty);
router.post("/", createTenant);

export default router;
