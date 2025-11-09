import {Router} from "express";
import { GeneroController } from "../../controllers/genero.controller.js";

const generoRouter = Router();
const generoController = new GeneroController();

generoRouter.get('/', generoController.getGeneros.bind(generoController));
generoRouter.get('/:id', generoController.getGeneroPorId.bind(generoController));
generoRouter.delete('/:id', generoController.eliminarGenero.bind(generoController));

export default generoRouter;
