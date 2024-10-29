import sequelize from "../utils/sequelize.js";
import { DataTypes } from 'sequelize';
import { Salud } from "./salud.js";

export const Mascota = sequelize.define('Mascota', {
  idMascota: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imagen: DataTypes.STRING,
  nombre: DataTypes.STRING,
  raza: DataTypes.STRING,
  descripcion: DataTypes.TEXT,
  idSalud: {
    type: DataTypes.INTEGER,
    references: {
      model: Salud,
      key: 'idSalud',
    },
  },
}, {
  tableName: 'Mascotas',
  timestamps: false,
});
