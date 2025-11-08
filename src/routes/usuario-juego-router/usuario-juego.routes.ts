import { Router } from "express";
import { UsuarioJuegoController } from "../../controllers/usuario-juego.controller.js";

const usuarioJuegoRouter = Router();
const usuarioJuegoController = new UsuarioJuegoController();

usuarioJuegoRouter.post('/', usuarioJuegoController.agregarJuegoAUsuario.bind(usuarioJuegoController));
usuarioJuegoRouter.get('/usuario/:usuarioId', usuarioJuegoController.obtenerJuegosDeUsuario.bind(usuarioJuegoController));
usuarioJuegoRouter.get('/juego/:juegoId', usuarioJuegoController.obtenerUsuariosDeJuego.bind(usuarioJuegoController));
usuarioJuegoRouter.delete('/', usuarioJuegoController.eliminarJuegoDeUsuario.bind(usuarioJuegoController));

export default usuarioJuegoRouter;