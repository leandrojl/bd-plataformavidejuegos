import {Router} from "express";
import { JuegoController } from "../../controllers/juego.controller.js";

const juegoRouter = Router();
const juegoController = new JuegoController();

juegoRouter.get('/juegos',juegoController.getJuegos.bind(juegoController));
juegoRouter.get('/juegos/:id',juegoController.getJuegoPorId.bind(juegoController));
juegoRouter.delete('/juegos/:id',juegoController.eliminarJuego.bind(juegoController));
juegoRouter.get('/juegos/imagenes/:id',juegoController.getImagenesDeUnJuego.bind(juegoController));
juegoRouter.get('/juegos/reviews/:id',juegoController.getReviewsDeUnJuego.bind(juegoController));


export default juegoRouter;