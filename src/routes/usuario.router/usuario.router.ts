import { Router } from "express";
import { UsuarioController } from "../../controllers/usuario.controller.js";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.get('/usuarios', usuarioController.getUsuarios.bind(usuarioController));
usuarioRouter.get('/usuarios/:id', usuarioController.getUsuario.bind(usuarioController));
usuarioRouter.post('/usuarios/login', usuarioController.loginUsuario.bind(usuarioController));
usuarioRouter.post('/usuarios', usuarioController.crearUsuario.bind(usuarioController));
export default usuarioRouter;

