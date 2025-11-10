
import type {WishlistRepository} from "../repository/wishlist.repository.ts";

export class WishlistService{
    constructor(private wishlistRepository: WishlistRepository) {}

    public async obtenerWishlistPorUsuario(usuarioId: number) {
        return await this.wishlistRepository.findWishlistByUsuarioId(usuarioId);
    }
    public async agregarJuegoAWishlist(usuarioId: number, juegoId: number) {
        return await this.wishlistRepository.addJuegoToWishlist(usuarioId, juegoId);
    }
    public async eliminarJuegoDeWishlist(usuarioId: number, juegoId: number) {
        return await this.wishlistRepository.removeJuegoFromWishlist(usuarioId, juegoId);
    }
}

