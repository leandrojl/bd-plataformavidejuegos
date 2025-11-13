import { Router } from "express";
import { CarritoController } from "../../controllers/carrito.controller.js";

const carritoRouter = Router();
const carritoController = new CarritoController();

carritoRouter.get("/:usuarioId", carritoController.getCarrito.bind(carritoController));
carritoRouter.post("/:usuarioId/agregar", carritoController.agregarJuego.bind(carritoController));
carritoRouter.delete("/:usuarioId/eliminar/:juegoId", carritoController.eliminarJuego.bind(carritoController));
carritoRouter.delete("/:usuarioId/vaciar", carritoController.vaciarCarrito.bind(carritoController));

export default carritoRouter;
