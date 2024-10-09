import sequelize from "../utils/sequelize.js"; // Asegúrate de importar sequelize
import { Direccion } from "./direccion.js";
import { Salud } from "./salud.js";
import { Mascota } from "./mascota.js";
import { Usuario } from "./usuarios.js";

// Define las relaciones aquí
Usuario.belongsTo(Direccion, {
  foreignKey: "idDireccion",
  as: "direccion",
});
Direccion.hasOne(Usuario, {
  foreignKey: "idDireccion",
  as: "usuario",
});

// Relación Mascota - Salud (uno a uno)
Mascota.belongsTo(Salud, {
  foreignKey: "idSalud",
  as: "salud",
});
Salud.hasOne(Mascota, {
  foreignKey: "idSalud",
  as: "mascota",
});

// Relación Usuario - Mascota (uno a muchos)
Usuario.hasMany(Mascota, {
  foreignKey: "idUsuario",
  as: "mascotas",
});
Mascota.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  as: "usuario",
});
