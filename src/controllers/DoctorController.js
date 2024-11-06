import Doctor from "../models/DoctorModels.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";
import generarID from "../helpers/generarID.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js"

const crearUsuario = async (req, res) => {
    const { email, nombre } = req.body;

    //verificar si el email existe
    const existeUsuario = await Doctor.findOne({
        where: { email },
    });

    if (existeUsuario) {
        return res.status(400).json({ msg: 'El usuario ya existe' });
    } else {
        try {
            const doctor = await Doctor.create(req.body);
            const doctorGuardado = await doctor.save();

            //Enviar email
            emailRegistro({
                email,
                nombre,
                token: doctorGuardado.token,
            })

            res.json({ ok: true, msg: "Revisa tu correo para confirmar tu cuenta" })

        } catch (error) {
            res.json({ msg: 'No se pudo crear el usuario' })
        }
    }
}

const confirmarCuenta = async (req, res) => {
    const { token } = req.params;

    try {
        const existeUsuario = await Doctor.findOne({
            where: { token },
        });

        if (existeUsuario) {

            existeUsuario.token = null;
            existeUsuario.confirmado = true;

            await existeUsuario.save();

            res.json({ ok: true, msg: "Usuario confirmado" });
        } else {
            res.status(400).json({ msg: "Token no válido" });
        }
    } catch (error) {
        res.status(500).json({ msg: "No se pudo encontrar el usuario" });
    }
};

const iniciarSesion = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el usuario existe
    const usuario = await Doctor.findOne({
        where: { email },
    });

    if (!usuario) {
        const error = new Error("Correo no registrado");
        return res.status(403).json({ msg: error.message });
    }

    if (!usuario.confirmado) {
        const error = new Error("Cuenta no confirmada");
        return res.status(403).json({ msg: error.message });
    }

    // Revisar el password
    const passwordCorrecto = await bcrypt.compare(password, usuario.password);

    if (passwordCorrecto) {
        //Devolvemos todo el usuario para que exista "auth?._id"
        res.status(200).json({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id),
            ok: true,
            msg: "Iniciando Sesión..."
        });
    } else {
        return res.status(403).json({
            ok: false,
            msg: "Password Incorrecto"
        });
    }
}

const mostrarPefil = async (req, res) => {
    const { doctor } = req

    res.json({ doctor });
}

const recuperarPassword = async (req, res) => {
    //Recuperar el usuario por email
    
    const { email } = req.body;

    const usuario = await Doctor.findOne({
        where: { email },
    });

    if (!usuario) {
        return res.status(404).json({ error: 'No se encontró el usuario' });
    }

    try {
        usuario.token = generarID()
        await usuario.save();

        emailOlvidePassword({
            email,
            nombre: usuario.nombre,
            token: usuario.token,
        })

        res.json({ ok: true, msg: "Hemos enviado un email con las instrucciones" })
    } catch (error) {
        res.json({ msg: "Hubo un error" })
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params

    const tokenValido = await Doctor.findOne({
        where: { token },
    });

    if (tokenValido) {
        res.json({ msg: "El usuario existe" })
    } else {
        return res.status(404).json({ error: 'No se encontró el usuario' });
    }

    try {
        usuario.token = generarID()
        await usuario.save();
        res.json({ msg: "Hemos enviado un email con las instrucciones" })
    } catch (error) {
        res.json({ msg: "Hubo un error" })
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body;

    const usuario = await Doctor.findOne({
        where: { token },
    });

    try {
        usuario.token = null;
        usuario.password = password;

        const passwordActualizado = await usuario.save();

        if (passwordActualizado) {
            return res.json({ 
                msg: "correcto" 
            });
        }
    } catch (error) {
        res.json({ msg: "Token no valido" })
    }
}

const eliminarPerfil = async (req, res) => {
    const { id } = req.params
    const { doctor } = req

    if (doctor.id !== req.doctor.id) {
        return res.json({ msg: "Accion no valida" })
    }

    try {
        const eliminarDoc = await Doctor.destroy({
            where: { id }
        });

        if (eliminarDoc) {
            res.json({ ok: true, msg: "Usuario eliminado correctamente" })
        } else {
            res.json({ msg: "El usuario no se pudo eliminar" })
        }
    } catch (error) {
        res.json({ msg: "No se pudo eliminar el usuario" })
    }
}

export {
    crearUsuario,
    iniciarSesion,
    mostrarPefil,
    recuperarPassword,
    comprobarToken,
    nuevoPassword,
    confirmarCuenta,
    eliminarPerfil
}