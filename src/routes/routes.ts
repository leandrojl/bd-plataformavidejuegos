import { Router } from "express";
import juegoRouter from "./juego-router/juego.routes.js";
import usuarioJuegoRouter from "./usuario-juego-router/usuario-juego.routes.js";
<<<<<<< HEAD
import  usuarioRouter  from "../routes/usuario.router/usuario.router.js";
import plataformaRouter from "./plataforma-router/plataforma.routes.js";
import generoRouter from "./genero-router/genero.routes.js";
=======
import  usuarioRouter  from "./usuario.router/usuario.routes.js";
import wishlistRouter from "./wishlist-router/wishlist.router.js";
>>>>>>> origin/back-elias

export class AppRoutes {

    static get routes():Router {

        const  router = Router();
    router.use("/juego", juegoRouter);
    router.use("/usuario-juego", usuarioJuegoRouter);
    router.use("/usuarios", usuarioRouter);
<<<<<<< HEAD
    router.use("/plataforma", plataformaRouter);
    router.use("/genero", generoRouter);
=======
    router.use("/wishlist", wishlistRouter);
>>>>>>> origin/back-elias
            return router;
        }

}