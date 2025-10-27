import { Router } from "express";
import { UsuarioJuegoController } from "../../controllers/usuario-juego.controller.js";

const usuarioJuegoRouter = Router();
const usuarioJuegoController = new UsuarioJuegoController();

usuarioJuegoRouter.post('/usuario-juego', usuarioJuegoController.agregarJuegoAUsuario.bind(usuarioJuegoController));
usuarioJuegoRouter.get('/usuario-juego/usuario/:usuarioId', usuarioJuegoController.obtenerJuegosDeUsuario.bind(usuarioJuegoController));
usuarioJuegoRouter.get('/usuario-juego/juego/:juegoId', usuarioJuegoController.obtenerUsuariosDeJuego.bind(usuarioJuegoController));
usuarioJuegoRouter.delete('/usuario-juego', usuarioJuegoController.eliminarJuegoDeUsuario.bind(usuarioJuegoController));

export default usuarioJuegoRouter;