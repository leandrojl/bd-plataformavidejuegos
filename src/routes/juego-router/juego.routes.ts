import { Router } from "express";
import { JuegoController } from "../../controllers/juego.controller.js";

const juegoRouter = Router();
const juegoController = new JuegoController();

/**
 * IMPORTANTE:
 * - Usamos prefijo '/juegos' en TODAS las rutas.
 * - La ruta de ofertas va ANTES que '/juegos/:id' para que no la capture como id.
 */

// Carrusel de ofertas
juegoRouter.get('/offers', juegoController.ofertas.bind(juegoController));

// Listado general
juegoRouter.get('/', juegoController.getJuegos.bind(juegoController));

// Detalle / delete por id
juegoRouter.get('/:id', juegoController.getJuegoPorId.bind(juegoController));
juegoRouter.delete('/:id', juegoController.eliminarJuego.bind(juegoController));

export default juegoRouter;

