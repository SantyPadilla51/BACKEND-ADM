import Router from "express"
import { obtenerPaciente, obtenerPacientes, actualizarPaciente, eliminarPaciente, crearPaciente, obtenerPacienteID } from "../controllers/PacienteController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = Router()

router.post('/crear-paciente', authMiddleware, crearPaciente)

router.get('/pacientes', authMiddleware, obtenerPacientes)

router.get('/pacientes/:dni', authMiddleware, obtenerPaciente)

router.get('/pacienteId/:id', authMiddleware, obtenerPacienteID)

router.put('/actualizar-paciente/:id', authMiddleware, actualizarPaciente)

router.delete('/eliminar-paciente/:id',authMiddleware, eliminarPaciente)


export default router