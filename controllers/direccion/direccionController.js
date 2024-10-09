import { Direccion } from "../../models/direccion.js";

// Controlador para obtener una dirección por ID
export const getDireccionById = async (req, res) => {
    try {
      const { id } = req.params; // Obtiene el ID de la dirección desde los parámetros de la URL
      const direccion = await Direccion.findByPk(id);
  
      if (direccion) {
        res.json(direccion); // Si encuentra la dirección, la envía
      } else {
        res.status(404).json({ message: 'Dirección no encontrada' }); // Si no, envía un error 404
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      res.status(500).json({ message: 'Error al obtener la dirección' });
    }
  };