import { Mascota } from "../../models/mascota.js";
import { Salud } from "../../models/salud.js";
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

export const createMascota = async (req, res) => {
  try {
    const {
      idUsuario,
      nombre,
      raza,
      descripcion,
      alergias,
      edad,
      peso,
      castrado,
      tipo,
    } = req.body;

    // Crear un nuevo registro en la tabla Salud
    const saludRecord = await Salud.create({ alergias, edad, peso, castrado });
    let imagen;
    switch (tipo) {
      case "Conejo":
        imagen =
          "https://res.cloudinary.com/dzemdgvqo/image/upload/v1730152603/ImusaIMGS/fq9voxoah14c7vwnsi60.png";
        break;
      case "Gato":
        imagen =
          "https://res.cloudinary.com/dzemdgvqo/image/upload/v1730152603/ImusaIMGS/wtzk7r9nkoccnykzxgtf.png";
        break;
      case "Pez":
        imagen =
          "https://res.cloudinary.com/dzemdgvqo/image/upload/v1730152603/ImusaIMGS/ixt4rlrgcrnhwprblou1.png";
        break;
      case "Perro":
        imagen =
          "https://res.cloudinary.com/dzemdgvqo/image/upload/v1730152603/ImusaIMGS/ir9angtjpy6iyezi328w.png";
        break;
      case "Ave":
        imagen =
          "https://res.cloudinary.com/dzemdgvqo/image/upload/v1730152602/ImusaIMGS/itenel7l60tyq68ik5w1.png";
        break;
      default:
        imagen =
          "https://res.cloudinary.com/dzemdgvqo/image/upload/v1730158093/ImusaIMGS/kiuwkug0b6a2cux3kvwr.png";
        break;
    }
    // Usar el ID de Salud creado para la Mascota
    const mascota = await Mascota.create({
      imagen,
      idUsuario,
      nombre,
      raza,
      descripcion,
      idSalud: saludRecord.idSalud,
    });

    if (mascota) {
      res.status(201).json(mascota);
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
    const mascota = await Mascota.destroy({ where: { idMascota:id } });
    
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
