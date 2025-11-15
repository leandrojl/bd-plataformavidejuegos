import { type Request, type Response } from "express";
import { GeneroService } from "../services/genero.service.js";
import { GeneroRepository } from "../repository/genero.repository.js";

const generoRepository = new GeneroRepository();
const generoService = new GeneroService(generoRepository);

export class GeneroController{
    constructor(){}

    public getGeneros = async(req: Request, res:Response)=>{
        try {
            const generos = await generoService.obtenerGeneros();
            res.status(200).json(generos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener géneros", error })
        }
    }

    public getGeneroPorId = async(req: Request, res:Response)=>{
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json("ID inválido");
            const genero = await generoService.obtenerGeneroPorId(id);
            res.status(200).json(genero);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener género por ID", error })
        }
    }

    public eliminarGenero = async(req: Request, res:Response)=>{
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return res.status(400).json("ID inválido");
            await generoService.eliminarGenero(id);
            res.status(200).json({ message: "Género eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar género", error })
        }
    }
}
