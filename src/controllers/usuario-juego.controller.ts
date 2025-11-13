import { type Request, type Response } from "express";
import { UsuarioJuegoService } from "../services/usuario-juego.service.js";
import { UsuarioJuegoRepository } from "../repository/usuario-juego.repository.js";

const usuarioJuegoRepository = new UsuarioJuegoRepository();
const usuarioJuegoService = new UsuarioJuegoService(usuarioJuegoRepository);

export class UsuarioJuegoController {
  constructor() {}

  public agregarJuegoAUsuario = async (req: Request, res: Response) => {
    try {
      const { usuarioId, juegoId } = req.body;
      if (isNaN(usuarioId) || isNaN(juegoId)) {
        return res.status(400).json("ID inválido");
      }
      const relacion = await usuarioJuegoService.agregarJuegoAUsuario(usuarioId, juegoId);
      res.status(201).json(relacion);
    } catch (error) {
      res.status(500).json({ message: "Error al agregar juego a usuario", error });
    }
  };

  public obtenerJuegosDeUsuario = async (req: Request, res: Response) => {
    try {
      const usuarioId = Number(req.params.usuarioId);
      if (isNaN(usuarioId)) {
        return res.status(400).json("ID inválido");
      }
      const juegos = await usuarioJuegoService.obtenerJuegosDeUsuario(usuarioId);
      res.status(200).json(juegos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener juegos de usuario", error });
    }
  };

  public obtenerUsuariosDeJuego = async (req: Request, res: Response) => {
    try {
      const juegoId = Number(req.params.juegoId);
      if (isNaN(juegoId)) {
        return res.status(400).json("ID inválido");
      }
      const usuarios = await usuarioJuegoService.obtenerUsuariosDeJuego(juegoId);
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios de juego", error });
    }
  };

  public eliminarJuegoDeUsuario = async (req: Request, res: Response) => {
    try {
      const { usuarioId, juegoId } = req.body;
      if (isNaN(usuarioId) || isNaN(juegoId)) {
        return res.status(400).json("ID inválido");
      }
      await usuarioJuegoService.eliminarJuegoDeUsuario(usuarioId, juegoId);
      res.status(200).json({ message: "Relación eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar relación", error });
    }
  };

  public agregarJuegosAUsuarioFlexible = async (req: Request, res: Response) => {
    try {
      const { usuarioId, juegos } = req.body; // juegos puede ser un solo ID o un array

      if (!usuarioId || !juegos || (Array.isArray(juegos) && juegos.length === 0)) {
        return res.status(400).json("Datos incompletos");
      }

      const registros = await usuarioJuegoService.agregarJuegos(usuarioId, juegos);
      res.status(201).json({ message: "Juegos registrados", registros });
    } catch (error) {
      res.status(500).json({ message: "Error al registrar juegos", error });
    }
  };
}