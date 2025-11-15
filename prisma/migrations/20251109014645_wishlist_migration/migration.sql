/*
  Warnings:

  - A unique constraint covering the columns `[usuarioId,juegoId]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Wishlist_usuarioId_juegoId_key` ON `Wishlist`(`usuarioId`, `juegoId`);
