import { type Request, type Response } from "express";
import { CarritoService } from "../services/carrito.service.js";
import { CarritoRepository } from "../repository/carrito.repository.js";

const carritoRepository = new CarritoRepository();
const carritoService = new CarritoService(carritoRepository);

export class CarritoController {
    async getCarrito(req: Request, res: Response) {
        try {
            const usuarioId = Number(req.params.usuarioId);
            const carrito = await carritoService.obtenerOCrearCarrito(usuarioId);
            const juegos = carrito?.juegos.map(j => j.juego) ?? [];
            res.json(juegos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener carrito", error });
        }
    }

    async agregarJuego(req: Request, res: Response) {
        try {
            const usuarioId = Number(req.params.usuarioId);
            const { juegoId } = req.body;
            const carrito = await carritoService.agregarJuego(usuarioId, juegoId);
            const juegos = carrito?.juegos.map(j => j.juego) ?? [];
            res.status(201).json(juegos);
        } catch (error) {
            res.status(500).json({ message: "Error al agregar juego al carrito", error });
        }
    }


    async eliminarJuego(req: Request, res: Response) {
        try {
            const usuarioId = Number(req.params.usuarioId);
            const juegoId = Number(req.params.juegoId);

            await carritoService.eliminarJuego(usuarioId, juegoId);
            const carritoActualizado = await carritoService.obtenerOCrearCarrito(usuarioId);

            const juegos = carritoActualizado?.juegos.map(j => j.juego) ?? [];
            res.json(juegos);
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar juego del carrito", error });
        }
    }


    async vaciarCarrito(req: Request, res: Response) {
        try {
            const usuarioId = Number(req.params.usuarioId);
            const result = await carritoService.vaciarCarrito(usuarioId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: "Error al vaciar el carrito", error });
        }
    }
}
