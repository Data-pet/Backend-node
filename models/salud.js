import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize.js";

export const Salud = sequelize.define(
  "Salud",
  {
    idSalud: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alergias: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    peso: DataTypes.FLOAT,
    castrado: DataTypes.BOOLEAN,
  },
  {
    tableName: "Salud",
    timestamps: false,
  }
);
