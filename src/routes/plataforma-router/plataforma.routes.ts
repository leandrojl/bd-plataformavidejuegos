import {Router} from "express";
import { PlataformaController } from "../../controllers/plataforma.controller.js";

const plataformaRouter = Router();
const plataformaController = new PlataformaController();

plataformaRouter.get('/', plataformaController.getPlataformas.bind(plataformaController));
plataformaRouter.get('/:id', plataformaController.getPlataformaPorId.bind(plataformaController));
plataformaRouter.delete('/:id', plataformaController.eliminarPlataforma.bind(plataformaController));

export default plataformaRouter;
