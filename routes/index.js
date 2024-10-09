import express from "express";
import direccionRuta from "./direccion.js";
import saludRuta from "./salud.js";
import mascotaRuta from "./mascota.js";
import usuarioRuta from "./usuario.js";
const router = express.Router();

// Registrar las rutas con un prefijo
router.use("/api", direccionRuta);
router.use("/api", saludRuta);
router.use("/api", mascotaRuta);
router.use("/api", usuarioRuta);

export default router;
