-- DropIndex
DROP INDEX `Carrito_usuarioId_fkey` ON `carrito`;

-- DropIndex
DROP INDEX `Carrito_Juego_carritoId_fkey` ON `carrito_juego`;

-- DropIndex
DROP INDEX `Carrito_Juego_juegoId_fkey` ON `carrito_juego`;

-- DropIndex
DROP INDEX `Imagen_juegoId_fkey` ON `imagen`;

-- DropIndex
DROP INDEX `Juego_desarrolladorId_fkey` ON `juego`;

-- DropIndex
DROP INDEX `Juego_Genero_generoId_fkey` ON `juego_genero`;

-- DropIndex
DROP INDEX `Juego_Genero_juegoId_fkey` ON `juego_genero`;

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
DROP INDEX `Usuario_Juego_juegoId_fkey` ON `usuario_juego`;

-- DropIndex
DROP INDEX `Usuario_Juego_usuarioId_fkey` ON `usuario_juego`;

-- DropIndex
DROP INDEX `Wishlist_juegoId_fkey` ON `wishlist`;

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
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_juegoId_fkey` FOREIGN KEY (`juegoId`) REFERENCES `Juego`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
