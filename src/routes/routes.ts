import { Router } from "express";
import { JuegoController } from "../controllers/juego.controller.js";
//import empleadoRouter from "./empleado-router/empleado.routes.js";
import juegoRouter from "./juego-router/juego.routes.js";
import usuarioJuegoRouter from "./usuario-juego-router/usuario-juego.routes.js";
import  usuarioRouter  from "../routes/usuario.router/usuario.router.js";

export class AppRoutes {

    static get routes():Router {

        const  router = Router();

        //router.use('/api/empleado',empleadoRouter)
    router.use("/juego", juegoRouter);
    router.use("/usuario-juego", usuarioJuegoRouter); // <-- agrega esta línea
    router.use("/usuarios", usuarioRouter);
            return router;
        }

}