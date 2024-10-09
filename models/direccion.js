import sequelize from "../utils/sequelize.js";
import { DataTypes } from 'sequelize';

export const Direccion = sequelize.define('Direccion', {
    idDireccion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Barrio: DataTypes.STRING,
    Calle: DataTypes.STRING,
    Ciudad: DataTypes.STRING,
  }, {
    tableName: 'Direccion',
    timestamps: false,
  });
  