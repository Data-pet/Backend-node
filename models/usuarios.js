import sequelize from "../utils/sequelize.js";
import { DataTypes } from 'sequelize';
import { Direccion } from "./direccion.js";
export const Usuario = sequelize.define('Usuario', {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: DataTypes.STRING,
    DNI: DataTypes.STRING,
    apellido: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    correo: DataTypes.STRING,
    tipoUsuario: DataTypes.STRING,
    telefono: DataTypes.STRING,
    idDireccion: {
      type: DataTypes.INTEGER,
      references: {
        model: Direccion,
        key: 'idDireccion',
      },
    },
  }, {
    tableName: 'Usuarios',
    timestamps: false,
  });
  