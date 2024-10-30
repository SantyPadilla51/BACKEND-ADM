import jwt from "jsonwebtoken"
import Doctor from "../models/DoctorModels.js";

const authMiddleware = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            req.doctor = await Doctor.findOne({
                where: { id: decoded.id },
                attributes: { exclude: ['password'] }
            })

            return next()

        } catch (error) {
            const e = new Error("Token no valido")
            return res.status(403).json({msg: e.message})
        }
    } 

    if(!token) {
        console.log("No hay token en la peticion");
        const e = new Error("No hay token en la petición")
        res.status(403).json({msg: e.message})
    }

    next();
}

export default authMiddleware;