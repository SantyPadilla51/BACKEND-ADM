import { Sequelize } from 'sequelize';
import db from "../config/db.js";
import Doctor from './DoctorModels.js';

const Paciente = db.define('pacientes', {
    nombre: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    apellido: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    dni: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    edad: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    telefono: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    sexo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    sintomas: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Doctor,
            key: 'id'
        }
    }
});

// Establece la relación
Doctor.hasMany(Paciente, {
    foreignKey: 'doctorId'
});
Paciente.belongsTo(Doctor, {
    foreignKey: 'doctorId'
});

export default Paciente;