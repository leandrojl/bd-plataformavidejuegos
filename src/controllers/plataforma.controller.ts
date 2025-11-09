import { type Request, type Response } from "express";
import { PlataformaService } from "../services/plataforma.service.js";
import { PlataformaRepository } from "../repository/plataforma.repository.js";

const plataformaRepository = new PlataformaRepository();
const plataformaService = new PlataformaService(plataformaRepository);

export class PlataformaController{
    constructor(){}

    public getPlataformas = async(req: Request, res:Response)=>{
        try {
            const plataformas = await plataformaService.obtenerPlataformas();
            res.status(200).json(plataformas);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener plataformas", error })
        }
    }

    public getPlataformaPorId = async(req: Request, res:Response)=>{
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json("ID inválido");
            const plataforma = await plataformaService.obtenerPlataformaPorId(id);
            res.status(200).json(plataforma);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener plataforma por ID", error })
        }
    }

    public eliminarPlataforma = async(req: Request, res:Response)=>{
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json("ID inválido");
            await plataformaService.eliminarPlataforma(id);
            res.status(200).json({ message: "Plataforma eliminada correctamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar plataforma", error })
        }
    }
}
