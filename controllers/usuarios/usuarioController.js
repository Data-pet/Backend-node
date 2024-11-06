import { Usuario } from "../../models/usuarios.js";
import { Direccion } from "../../models/direccion.js";
import sequelize from "../../utils/sequelize.js";
//controlador para obtener todas las usuarios

export const LoginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca al usuario y su dirección relacionada
    const usuario = await Usuario.findOne({
      where: { correo: email },
      include: [
        {
          model: Direccion,
          as: "direccion",
          attributes: { exclude: ["usuarioId"] },
        },
      ],
    });

    if (usuario) {
      // Verificar si la contraseña coincide
      if (usuario.password === password) {
        // Retornar el usuario encontrado sin incluir la contraseña
        const { password, ...usuarioSinContrasena } = usuario.dataValues;
        res.json(usuarioSinContrasena);
      } else {
        res.status(401).json({ message: "Contraseña incorrecta" });
      }
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    if (usuarios) {
      res.json(usuarios);
    } else {
      res.status(404).json({ message: "No se encontraron usuarios" });
    }
  } catch (error) {
    console.error("Error al obtener las usuarios:", error);
    res.status(500).json({ message: "Error al obtener las usuarios" });
  }
};

//controlador para obtener una usuario por ID

export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

//controlador para crear un usuario

export const createUsuario = async (req, res) => {
  const transaction = await sequelize.transaction(); // Inicia una transacción
  try {
    const {
      name,
      DNI,
      apellido,
      password,
      correo,
      tipoUsuario,
      telefono,
      barrio,
      calle,
      ciudad,
    } = req.body;

    // Crear la dirección primero
    const direccion = await Direccion.create(
      { Barrio: barrio, Calle: calle, Ciudad: ciudad },
      { transaction } // Asegúrate de pasar la transacción
    );

    // Luego crea el usuario y asocia la dirección
    const usuario = await Usuario.create(
      {
        name,
        DNI,
        apellido,
        password,
        correo,
        tipoUsuario,
        telefono,
        idDireccion: direccion.idDireccion,
      },
      { transaction } // Asegúrate de pasar la transacción
    );

    // Confirma las operaciones
    await transaction.commit();

    res.json(usuario);
  } catch (error) {
    // Si ocurre un error, revertir todas las operaciones
    await transaction.rollback();
    console.error("Error al crear el usuario y la dirección:", error);
    res
      .status(500)
      .json({ message: "Error al crear el usuario y la dirección" });
  }
};

//controlador para actualizar un usuario

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      DNI,
      apellido,
      password,
      correo,
      tipoUsuario,
      telefono,
      idDireccion,
    } = req.body;
    const usuario = await Usuario.update(
      {
        name,
        DNI,
        apellido,
        password,
        correo,
        tipoUsuario,
        telefono,
        idDireccion,
      },
      { where: { id } }
    );
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: "No se pudo actualizar el usuario" });
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

//controlador para eliminar un usuario

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.destroy({ where: { idUsuario: id } });
    // se agrego el where para que sea posible eliminar en base al modelo registrado
    // ver modelo del usuario
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: "No se pudo eliminar el usuario" });
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};
