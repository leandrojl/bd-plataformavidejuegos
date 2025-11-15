import { Router } from "express";
import { WishlistController } from "../../controllers/wishlist.controller.js";
const wishlistRouter = Router();
const wishlistController = new WishlistController();



wishlistRouter.get('/:usuarioId', wishlistController.getWishlistPorUsuario.bind(wishlistController));
wishlistRouter.post('/', wishlistController.agregarJuegoAWishlist.bind(wishlistController));
wishlistRouter.delete('/:usuarioId/:juegoId', wishlistController.eliminarJuegoDeWishlist.bind(wishlistController));
export default wishlistRouter;
