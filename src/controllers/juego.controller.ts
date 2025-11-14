import { type Request, type Response } from "express";
import { JuegoService } from "../services/juego.service.js";
import { JuegoRepository } from "../repository/juego.repository.js";

const juegoRepository = new JuegoRepository();
const juegoService = new JuegoService(juegoRepository);

export class JuegoController {
  public getJuegos = async (req: Request, res: Response) => {
    try {
      const juegos = await juegoService.obtenerJuegos();
      res.status(200).json(juegos);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener juegos",
        error: (error as Error).message,
      });
    }
  };

  public getJuegoPorId = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const juego = await juegoService.obtenerJuegoPorId(id);
      if (!juego) {
        return res.status(404).json({ message: "Juego no encontrado" });
      }

      res.status(200).json(juego);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener juego por ID",
        error: (error as Error).message,
      });
    }
  };

  public eliminarJuego = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }

      const eliminado = await juegoService.eliminarJuego(id);
      if (!eliminado) {
        return res.status(404).json({ message: "Juego no encontrado" });
      }

      res.status(200).json({ message: "Juego eliminado correctamente" });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar juego",
        error: (error as Error).message,
      });
    }
  };

  public  ofertas = async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 8;
      const data = await juegoService.listarOfertasActivas(limit);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener ofertas", error });
    }
  };
}