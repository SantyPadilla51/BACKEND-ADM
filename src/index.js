import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import router from "./routes/PacientesRouter.js"
import routerDoc from "./routes/DoctorRouter.js"


dotenv.config()
const app = express()

app.use(cors({
    origin: "*", // Aquí debes agregar el dominio o IP de tu front-end
}));
app.use(express.json())


// Conexión a la base de datos y ejecución del servidor
const iniciarServer = async () => {
    await connectDB(); // Esperar a que la conexión se complete

    // Rutas
    app.use(router);
    app.use(routerDoc);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Conectado al puerto: ${PORT}`);
    });
};

// Iniciar el servidor
iniciarServer();
