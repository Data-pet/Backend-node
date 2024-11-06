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

// Consultar mascotas por idUsuario e incluir su salud
export const getMascotasUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const mascotas = await Mascota.findAll({
      where: { idUsuario },
      include: [
        {
          model: Salud,
          as: "salud",
        },
      ],
    });

    if (mascotas.length > 0) {
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
    const saludRecord = await Salud.create({
      alergias,
      edad,
      peso,
      castrado,
    });

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
      tipo,
      edad,
      peso,
      alergias,
      raza,
      descripcion,
      tipo,
      idSalud: saludRecord.idSalud, // Asociamos el idSalud con la mascota
    });

    // Ahora actualizamos el registro de Salud para agregar el idMascota
    if (mascota) {
      await Salud.update(
        { idMascota: mascota.idMascota }, // Actualiza la Salud con el idMascota
        { where: { idSalud: saludRecord.idSalud } }
      );

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
    const {
      nombre,
      raza,
      descripcion,
      idSalud,
      tipo,
      alergias,
      edad,
      peso,
      castrado,
    } = req.body;

    // Seleccionar la imagen basada en el tipo de mascota
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

    // Actualizar los datos de la mascota, incluyendo la imagen
    const [mascotaUpdated] = await Mascota.update(
      { nombre, raza, descripcion, idSalud, tipo, imagen },
      { where: { idMascota: id } }
    );

    if (!mascotaUpdated) {
      return res
        .status(404)
        .json({ message: "No se pudo actualizar la mascota" });
    }

    // Verificar si hay datos de salud para actualizar
    if (idSalud) {
      const [saludUpdated] = await Salud.update(
        { alergias, edad, peso, castrado },
        { where: { idSalud } }
      );

      if (!saludUpdated) {
        return res
          .status(404)
          .json({ message: "No se pudo actualizar la salud de la mascota" });
      }
    }

    // Obtener y devolver los datos actualizados
    const mascota = await Mascota.findOne({
      where: { idMascota: id },
      include: [
        {
          model: Salud,
          as: "salud",
          required: false,
          attributes: [
            "idSalud",
            "alergias",
            "edad",
            "peso",
            "castrado",
            "idMascota",
          ],
        },
      ],
    });

    res.json(mascota);
  } catch (error) {
    console.error("Error al actualizar la mascota y su salud:", error);
    res
      .status(500)
      .json({ message: "Error al actualizar la mascota y su salud" });
  }
};

//controlador para eliminar una mascota

export const deleteMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const mascota = await Mascota.destroy({ where: { idMascota: id } });

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
