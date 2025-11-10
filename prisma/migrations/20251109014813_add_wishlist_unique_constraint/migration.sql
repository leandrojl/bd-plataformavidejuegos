/*
  Warnings:

  - Made the column `usuarioId` on table `wishlist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `juegoId` on table `wishlist` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `Wishlist_juegoId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `Wishlist_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Wishlist_juegoId_fkey` ON `wishlist`;

-- AlterTable
ALTER TABLE `wishlist` MODIFY `usuarioId` INTEGER NOT NULL,
    MODIFY `juegoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_juegoId_fkey` FOREIGN KEY (`juegoId`) REFERENCES `Juego`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
