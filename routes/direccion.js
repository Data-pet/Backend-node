import { Router } from "express";
import { getDireccionById } from "../controllers/direccion/direccionController.js";
const router = Router();

router.get("/direccion/:id", getDireccionById);

export default router;
