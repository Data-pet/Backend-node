import { Router } from "express";
import {
  getSaluds,
  getSaludById,
  createSalud,
  updateSalud,
  deleteSalud,
} from "../controllers/salud/saludController.js";
const router = Router();

router.get("/saluds", getSaluds);
router.get("/saluds/:id", getSaludById);
router.post("/saluds", createSalud);
router.put("/saluds/:id", updateSalud);
router.delete("/saluds/:id", deleteSalud);

export default router;  