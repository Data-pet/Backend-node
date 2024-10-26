import sequelize from "../utils/sequelize.js";
import { Direccion } from "./direccion.js";
import { Salud } from "./salud.js";
import { Mascota } from "./mascota.js";
import { Usuario } from "./usuarios.js";

console.log("Estamos sincronizando las tablas...");
// Relación Usuario -  Dirección (uno a uno)
Usuario.belongsTo(Direccion, {
  foreignKey: "idDireccion",
  as: "direccion",
});
Direccion.hasOne(Usuario, {
  foreignKey: "idDireccion",
  as: "usuario",
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

// Relación Mascota - Salud (uno a uno)
Mascota.hasOne(Salud, {
  foreignKey: "idMascota",
  as: "salud",
});
Salud.belongsTo(Mascota, {
  foreignKey: "idMascota",
  as: "mascota",
});

// Sincronización de los modelos en la base de datos
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tablas sincronizadas correctamente ✅");
  })
  .catch((error) => {
    console.error("Error al sincronizar las tablas ❌",error);
  });
