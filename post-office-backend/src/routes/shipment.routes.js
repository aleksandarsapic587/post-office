import express from "express";
import { getShipments, createShipment, updateShipment, deleteShipment } from "../controllers/shipment.controller.js";

const router = express.Router();

router.get("/", getShipments);
router.post("/", createShipment);
router.put("/:id", updateShipment);
router.delete("/:id", deleteShipment);

export default router;
