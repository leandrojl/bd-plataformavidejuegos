/*
  Warnings:

  - You are about to drop the column `generoId` on the `juego` table. All the data in the column will be lost.
  - You are about to drop the `compra` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mainImagenId]` on the table `Juego` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `carrito` DROP FOREIGN KEY `Carrito_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `carrito_juego` DROP FOREIGN KEY `Carrito_Juego_carritoId_fkey`;

-- DropForeignKey
ALTER TABLE `carrito_juego` DROP FOREIGN KEY `Carrito_Juego_juegoId_fkey`;

-- DropForeignKey
ALTER TABLE `compra` DROP FOREIGN KEY `Compra_juegoId_fkey`;

-- DropForeignKey
ALTER TABLE `compra` DROP FOREIGN KEY `Compra_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `juego` DROP FOREIGN KEY `Juego_desarrolladorId_fkey`;

-- DropForeignKey
ALTER TABLE `juego` DROP FOREIGN KEY `Juego_generoId_fkey`;

-- DropForeignKey
ALTER TABLE `juego_plataforma` DROP FOREIGN KEY `Juego_Plataforma_juegoId_fkey`;

-- DropForeignKey
ALTER TABLE `juego_plataforma` DROP FOREIGN KEY `Juego_Plataforma_plataformaId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_juegoId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_tipoUsuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `Wishlist_juegoId_fkey`;

-- DropForeignKey
ALTER TABLE `wishlist` DROP FOREIGN KEY `Wishlist_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Carrito_usuarioId_fkey` ON `carrito`;

-- DropIndex
DROP INDEX `Carrito_Juego_carritoId_fkey` ON `carrito_juego`;

-- DropIndex
DROP INDEX `Carrito_Juego_juegoId_fkey` ON `carrito_juego`;

-- DropIndex
DROP INDEX `Juego_desarrolladorId_fkey` ON `juego`;

-- DropIndex
DROP INDEX `Juego_generoId_fkey` ON `juego`;

-- DropIndex
DROP INDEX `Juego_Plataforma_juegoId_fkey` ON `juego_plataforma`;

-- DropIndex
DROP INDEX `Juego_Plataforma_plataformaId_fkey` ON `juego_plataforma`;

-- DropIndex
DROP INDEX `Review_juegoId_fkey` ON `review`;

-- DropIndex
DROP INDEX `Review_usuarioId_fkey` ON `review`;

-- DropIndex
DROP INDEX `Usuario_tipoUsuarioId_fkey` ON `usuario`;

-- DropIndex
DROP INDEX `Wishlist_juegoId_fkey` ON `wishlist`;

-- DropIndex
DROP INDEX `Wishlist_usuarioId_fkey` ON `wishlist`;

-- AlterTable
ALTER TABLE `carrito` MODIFY `usuarioId` INTEGER NULL;

-- AlterTable
ALTER TABLE `carrito_juego` MODIFY `carritoId` INTEGER NULL,
    MODIFY `juegoId` INTEGER NULL;

-- AlterTable
ALTER TABLE `desarrollador` MODIFY `nombre` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `genero` MODIFY `nombre` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `juego` DROP COLUMN `generoId`,
    ADD COLUMN `mainImagenId` INTEGER NULL,
    ADD COLUMN `subtitulo` VARCHAR(191) NULL,
    MODIFY `nombre` VARCHAR(191) NULL,
    MODIFY `precio` DOUBLE NULL,
    MODIFY `descripcion` VARCHAR(191) NULL,
    MODIFY `desarrolladorId` INTEGER NULL;

-- AlterTable
ALTER TABLE `juego_plataforma` MODIFY `juegoId` INTEGER NULL,
    MODIFY `plataformaId` INTEGER NULL;

-- AlterTable
ALTER TABLE `plataforma` MODIFY `nombre` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `descripcion` TEXT NULL,
    MODIFY `usuarioId` INTEGER NULL,
    MODIFY `juegoId` INTEGER NULL;

-- AlterTable
ALTER TABLE `tipo_usuario` MODIFY `descripcion` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `nombre` VARCHAR(191) NULL,
    MODIFY `apellido` VARCHAR(191) NULL,
    MODIFY `tipoUsuarioId` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `wishlist` MODIFY `usuarioId` INTEGER NULL,
    MODIFY `juegoId` INTEGER NULL;

-- DropTable
DROP TABLE `compra`;

-- CreateTable
CREATE TABLE `Usuario_Juego` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `detalle` VARCHAR(191) NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuarioId` INTEGER NULL,
    `juegoId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Juego_Genero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `detalle` VARCHAR(191) NULL,
    `juegoId` INTEGER NULL,
    `generoId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Imagen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NULL,
    `alt` VARCHAR(191) NULL,
    `orden` INTEGER NOT NULL DEFAULT 0,
    `isMain` BOOLEAN NOT NULL DEFAULT false,
    `juegoId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Juego_mainImagenId_key` ON `Juego`(`mainImagenId`);

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_tipoUsuarioId_fkey` FOREIGN KEY (`tipoUsuarioId`) REFERENCES `Tipo_Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_juegoId_fkey` FOREIGN KEY (`juegoId`) REFERENCES `Juego`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario_Juego` ADD CONSTRAINT `Usuario_Juego_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario_Juego` ADD CONSTRAINT `Usuario_Juego_juegoId_fkey` FOREIGN KEY (`juegoId`) REFERENCES `Juego`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_juegoId_fkey` FOREIGN KEY (`juegoId`) REFERENCES `Juego`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrito` ADD CONSTRAINT `Carrito_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrito_Juego` ADD CONSTRAINT `Carrito_Juego_carritoId_fkey` FOREIGN KEY (`carritoId`) REFERENCES `Carrito`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrito_Juego` ADD CONSTRAINT `Carrito_Juego_juegoId_fkey` FOREIGN KEY (`juegoId`) REFERENCES `Juego`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Juego` ADD CONSTRAINT `Juego_desarrolladorId_fkey` FOREIGN KEY (`desarrolladorId`) REFERENCES `Desarrollador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Juego` ADD CONSTRAINT `Juego_mainImagenId_fkey` FOREIGN KEY (`mainImagenId`) REFERENCES `Imagen`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Juego_Genero` ADD CONSTRAINT `Juego_Genero_juegoId_fkey` FOREIGN KEY (`juegoId`) REFERENCES `Juego`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Juego_Genero` ADD CONSTRAINT `Juego_Genero_generoId_fkey` FOREIGN KEY (`generoId`) REFERENCES `Genero`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Juego_Plataforma` ADD CONSTRAINT `Juego_Plataforma_juegoId_fkey` FOREIGN KEY (`juegoId`) REFERENCES `Juego`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Juego_Plataforma` ADD CONSTRAINT `Juego_Plataforma_plataformaId_fkey` FOREIGN KEY (`plataformaId`) REFERENCES `Plataforma`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Imagen` ADD CONSTRAINT `Imagen_juegoId_fkey` FOREIGN KEY (`juegoId`) REFERENCES `Juego`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
