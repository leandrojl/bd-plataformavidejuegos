/*
  Warnings:

  - You are about to drop the column `generoId` on the `juego` table. All the data in the column will be lost.
  - You are about to drop the `compra` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mainImagenId]` on the table `Juego` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fechaLanzamiento` to the `Juego` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Juego` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `compra` DROP FOREIGN KEY `Compra_juegoId_fkey`;

-- DropForeignKey
ALTER TABLE `compra` DROP FOREIGN KEY `Compra_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `juego` DROP FOREIGN KEY `Juego_generoId_fkey`;

-- DropIndex
DROP INDEX `Juego_generoId_fkey` ON `juego`;

-- AlterTable
ALTER TABLE `juego` DROP COLUMN `generoId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `destacado` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `fechaLanzamiento` DATETIME(3) NOT NULL,
    ADD COLUMN `mainImagenId` INTEGER NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `compra`;

-- CreateTable
CREATE TABLE `Usuario_Juego` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `detalle` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuarioId` INTEGER NOT NULL,
    `juegoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Juego_Genero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `detalle` VARCHAR(191) NULL,
    `juegoId` INTEGER NOT NULL,
    `generoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Imagen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `alt` VARCHAR(191) NULL,
    `orden` INTEGER NOT NULL DEFAULT 0,
    `isMain` BOOLEAN NOT NULL DEFAULT false,
    `creadoAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `juegoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Oferta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `juegoId` INTEGER NOT NULL,
    `descuento` DOUBLE NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Juego_mainImagenId_key` ON `Juego`(`mainImagenId`);

-- AddForeignKey
ALTER TABLE `Usuario_Juego` ADD CONSTRAINT `Usuario_Juego_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario_Juego` ADD CONSTRAINT `Usuario_Juego_juegoId_fkey` FOREIGN KEY (`juegoId`) REFERENCES `Juego`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Juego` ADD CONSTRAINT `Juego_mainImagenId_fkey` FOREIGN KEY (`mainImagenId`) REFERENCES `Imagen`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Juego_Genero` ADD CONSTRAINT `Juego_Genero_juegoId_fkey` FOREIGN KEY (`juegoId`) REFERENCES `Juego`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Juego_Genero` ADD CONSTRAINT `Juego_Genero_generoId_fkey` FOREIGN KEY (`generoId`) REFERENCES `Genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Imagen` ADD CONSTRAINT `Imagen_juegoId_fkey` FOREIGN KEY (`juegoId`) REFERENCES `Juego`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Oferta` ADD CONSTRAINT `Oferta_juegoId_fkey` FOREIGN KEY (`juegoId`) REFERENCES `Juego`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
