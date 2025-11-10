

import { prisma } from "../prisma.js";


export class WishlistRepository {

 async findWishlistByUsuarioId(usuarioId: number) {
  return prisma.wishlist.findMany({
    where: { usuarioId },
    include: {
      juego: {
        include: {
          imagenes: true, 
        },
      },
    },
  });
}


    async addJuegoToWishlist(usuarioId: number, juegoId: number) {
  return prisma.wishlist.create({
    data: {
      usuario: { connect: { id: usuarioId } },
      juego: { connect: { id: juegoId } },
    },
  });
}

 async removeJuegoFromWishlist(usuarioId: number, juegoId: number) {
  return prisma.wishlist.delete({
    where: {
      usuarioId_juegoId: { usuarioId, juegoId },
    },
  });
}
}