import {Sequelize} from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const db = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "postgres",
    define: {
        timestamps: false
    }
})

// Función para autenticar la conexión
export const connectDB = async () => {
    try {
        await db.authenticate();
        console.log('Conectado a la Base de Datos');
    } catch (error) {
        console.error('No se pudo conectar a la Base de Datos:', error);
        // Opcional: Cerrar el proceso si la conexión falla
        process.exit(1); // Salir con un código de error
    }
};

export default db;