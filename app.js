import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
// Importar el archivo de asociaciones
import "./models/associations.js";
// Carga las rutas
import indexRouter from "./routes/index.js";
// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Define el puerto en el que se ejecutará el servidor
const port = process.env.PORT;

// Inicializa una instancia de Express
const app = express();

// Middleware para parsear los datos entrantes en formato JSON
app.use(express.json());
 
// Middleware para habilitar la comunicación entre servidores (CORS)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.4.123:8081", //ises web
      "http://localhost:8081", //web de casa
      "http://192.168.100.134:8081", //celular
      "http://192.168.100.95:8081", //celular
      "http://192.168.4.28:8081",
      "http://192.168.100.141:8081",
    ],
    credentials: true,
  })
);

// Middleware para el registro de solicitudes HTTP (solicitudes de desarrollo)
app.use(morgan("dev"));
// Rutas principales de la aplicación
app.use(indexRouter);
// Inicia el servidor y lo hace escuchar en el puerto especificado
app.listen(port, () => {
  console.log("El servidor está funcionando correctamente ✅");
});
