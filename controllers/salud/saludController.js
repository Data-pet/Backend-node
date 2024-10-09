import { Salud } from "../../models/salud.js";

//controlador para obtener todas las saluds

export const getSaluds = async (req, res) => {
  try {
    const saluds = await Salud.findAll();
    if (saluds) {
      res.json(saluds);
    } else {
      res.status(404).json({ message: "No se encontraron saluds" });
    }
  } catch (error) {
    console.error("Error al obtener las saluds:", error);
    res.status(500).json({ message: "Error al obtener las saluds" });
  }
};

//controlador para obtener una salud por ID

export const getSaludById = async (req, res) => {
  try {
    const { id } = req.params;
    const salud = await Salud.findByPk(id);
    if (salud) {
      res.json(salud);
    } else {
      res.status(404).json({ message: "Salud no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener la salud:", error);
    res.status(500).json({ message: "Error al obtener la salud" });
  }
};

//controlador para crear una salud

export const createSalud = async (req, res) => {
  try {
    const salud = await Salud.create(req.body);
    if (salud) {
      res.json(salud);
    } else {
      res.status(404).json({ message: "No se pudo crear la salud" });
    }
  } catch (error) {
    console.error("Error al crear la salud:", error);
    res.status(500).json({ message: "Error al crear la salud" });
  }
};

//controlador para actualizar una salud

export const updateSalud = async (req, res) => {
  try {
    const { id } = req.params;
    const salud = await Salud.update(req.body, { where: { id } });
    if (salud) {
      res.json(salud);
    } else {
      res.status(404).json({ message: "No se pudo actualizar la salud" });
    }
  } catch (error) {
    console.error("Error al actualizar la salud:", error);
    res.status(500).json({ message: "Error al actualizar la salud" });
  }
};

//controlador para eliminar una salud

export const deleteSalud = async (req, res) => {
  try {
    const { id } = req.params;
    const salud = await Salud.destroy({ where: { id } });
    if (salud) {
      res.json(salud);
    } else {
      res.status(404).json({ message: "No se pudo eliminar la salud" });
    }
  } catch (error) {
    console.error("Error al eliminar la salud:", error);
    res.status(500).json({ message: "Error al eliminar la salud" });
  }
};  