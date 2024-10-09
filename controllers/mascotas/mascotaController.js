import { Mascota } from "../../models/mascota.js";

//controlador para obtener todas las mascotas

export const getMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.findAll();
    if (mascotas) {
      res.json(mascotas);
    } else {
      res.status(404).json({ message: "No se encontraron mascotas" });
    }
  } catch (error) {
    console.error("Error al obtener las mascotas:", error);
    res.status(500).json({ message: "Error al obtener las mascotas" });
  }
};

//controlador para obtener una mascota por ID

export const getMascotaById = async (req, res) => {
  try {
    const { id } = req.params;
    const mascota = await Mascota.findByPk(id);
    if (mascota) {
      res.json(mascota);
    } else {
      res.status(404).json({ message: "Mascota no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener la mascota:", error);
    res.status(500).json({ message: "Error al obtener la mascota" });
  }
};

//controlador para crear una mascota

export const createMascota = async (req, res) => {
  try {
    const { nombre, raza, descripcion, idSalud } = req.body;
    const mascota = await Mascota.create({ nombre, raza, descripcion, idSalud });
    if (mascota) {
      res.json(mascota);
    } else {
      res.status(404).json({ message: "No se pudo crear la mascota" });
    }
  } catch (error) {
    console.error("Error al crear la mascota:", error);
    res.status(500).json({ message: "Error al crear la mascota" });
  }
};

//controlador para actualizar una mascota

export const updateMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, raza, descripcion, idSalud } = req.body;
    const mascota = await Mascota.update(
      { nombre, raza, descripcion, idSalud },
      { where: { id } }
    );
    if (mascota) {
      res.json(mascota);
    } else {
      res.status(404).json({ message: "No se pudo actualizar la mascota" });
    }
  } catch (error) {
    console.error("Error al actualizar la mascota:", error);
    res.status(500).json({ message: "Error al actualizar la mascota" });
  }
};

//controlador para eliminar una mascota

export const deleteMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const mascota = await Mascota.destroy({ where: { id } });
    if (mascota) {
      res.json(mascota);
    } else {
      res.status(404).json({ message: "No se pudo eliminar la mascota" });
    }
  } catch (error) {
    console.error("Error al eliminar la mascota:", error);
    res.status(500).json({ message: "Error al eliminar la mascota" });
  }
};