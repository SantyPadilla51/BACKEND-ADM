import express from "express"
import { connectDB } from "./config/db.js"
import cors from "cors"
import router from "./routes/PacientesRouter.js"
import routerDoc from "./routes/DoctorRouter.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()

const allowedOrigins = ['https://front-end-adm-pacientes.vercel.app'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Si necesitas enviar cookies
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
