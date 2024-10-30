import Paciente from "../models/PacienteModels.js"

const obtenerPacientes = async (req, res) => {

    const pacientes = await Paciente.findAll({
        where: {
            doctorId: req.doctor.id
        }
    })

    res.json(pacientes)
}

const obtenerPaciente = async (req, res) => {
    const { dni } = req.params


    const paciente = await Paciente.findAll({
        where: { dni }
    })

    const doctorIdPaciente = paciente[0].doctorId.toString()

    if (doctorIdPaciente !== req.doctor.id) {
        res.json({ msg: "Accion no valida" })
    } else {
        res.json({ paciente })
    }
}

const obtenerPacienteID = async (req, res) => {
    const { id } = req.params


    const paciente = await Paciente.findAll({
        where: { id }
    })

    const doctorIdPaciente = paciente[0].doctorId.toString()

    if (doctorIdPaciente !== req.doctor.id) {
        res.json({ msg: "Accion no valida" })
    } else {
        res.json({ paciente })
    }
}

const crearPaciente = async (req, res) => {
    const paciente = new Paciente(req.body)
    paciente.doctorId = req.doctor.id

    try {
        const pacienteGuardado = await paciente.save();

        if (pacienteGuardado) {
            res.status(200).json({
                ok: true,
                msg: 'Paciente Creado Correctamente'
            })
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'El paciente no se pudo crear correctamente'
            })
        }
    } catch (error) {
        res.send({ msg: error.message })
    }
}

const actualizarPaciente = async (req, res) => {
    const { id } = req.params

    const paciente = await Paciente.findOne({
        where: { id }
    })

    if (!paciente) {
        return res.status(404).json({ msg: 'El paciente no existe' })
    }

    const doctorIdPaciente = paciente.doctorId.toString()    

    if (doctorIdPaciente !== req.doctor.id) {
        res.json({ msg: "Accion no valida" })
    }

    try {
        const [filasActualizadas] = await Paciente.update(req.body, {
            where: { id }
        });

        if (filasActualizadas) {

            res.json({ ok: true, msg: 'Paciente actualizado correctamente' })

        } else {
            res.json({ msg: 'El paciente no se pudo actualizar' })
        }

    } catch (error) {
        res.json({ msg: "Ocurrio un error" })
    }
}

const eliminarPaciente = async (req, res) => {

    const { id } = req.params

    const paciente = await Paciente.findOne({
        where: { id }
    })

    if (!paciente) {
        return res.status(404).json({ msg: 'El paciente no existe' })
    }

    const doctorIdPaciente = paciente.doctorId.toString()

    if (doctorIdPaciente !== req.doctor.id) {
        res.json({ msg: "Accion no valida" })
    } else {
        try {
            const pacienteEliminado = await Paciente.destroy({
                where: { id }
            })
            if (pacienteEliminado) {
                res.json({ ok: true, msg: 'Paciente eliminado correctamente' })
            } else {
                res.json({ msg: 'El paciente no se pudo eliminar' })
            }
        } catch (error) {
            res.json({ msg: error.message })
        }
    }
}

export {
    obtenerPacientes,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente,
    obtenerPaciente,
    obtenerPacienteID
}
