import { Router } from "express";
import {
  getMascotas,
  getMascotaById,
  createMascota,
  updateMascota,
  deleteMascota,
  getMascotasUsuario,

} from "../controllers/mascotas/mascotaController.js";
const router = Router();
router.get("/mascotas", getMascotas);
router.get("/mascotasUsuario/:idUsuario", getMascotasUsuario);
router.get("/mascotas/:id", getMascotaById);
router.post("/mascotas", createMascota);
router.put("/mascotas/:id", updateMascota);
router.delete("/mascotas/:id", deleteMascota);

export default router;