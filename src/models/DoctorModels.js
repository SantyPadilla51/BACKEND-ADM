import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import db from "../config/db.js";
import generarID from '../helpers/generarID.js';

const Doctor = db.define('doctores', {
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
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    dni: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    token: {
        type: Sequelize.Sequelize.TEXT,
        defaultValue: generarID(),
    },
    confirmado:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },

}, {
    hooks: {
        beforeCreate: async (doctor) => {
            if (doctor.password) {
                const salt = await bcrypt.genSalt(10);
                doctor.password = await bcrypt.hash(doctor.password, salt);
            }
        },
        beforeUpdate: async (doctor) => {
            if (doctor.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                doctor.password = await bcrypt.hash(doctor.password, salt);
            }
        }
    }
});

export default Doctor;