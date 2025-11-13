import { Router } from "express";
import { UsuarioController } from "../../controllers/usuario.controller.js";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.get('/', usuarioController.getUsuarios.bind(usuarioController));
usuarioRouter.get('/:id', usuarioController.getUsuario.bind(usuarioController));
usuarioRouter.post('/login', usuarioController.loginUsuario.bind(usuarioController));
usuarioRouter.post('/', usuarioController.crearUsuario.bind(usuarioController));
usuarioRouter.get('/:id/saldo', usuarioController.getSaldo.bind(usuarioController));
usuarioRouter.put('/:id/descontar-saldo', usuarioController.descontarSaldo.bind(usuarioController));
usuarioRouter.patch('/:id/imagenes', usuarioController.actualizarImagenes.bind(usuarioController));

export default usuarioRouter;

