import { prisma } from "../prisma.js";

export class CarritoRepository {
    async obtenerCarritoPorUsuario(usuarioId: number) {
        return prisma.carrito.findUnique({
            where: { usuarioId },
            include: {
                juegos: {
                    include: { juego: true }
                }
            }
        });
    }

    async crearCarrito(usuarioId: number) {
        return prisma.carrito.create({
            data: { usuarioId },
            include: {
                juegos: {
                    include: { juego: true }
                }
            }
        });
    }

    async agregarJuego(carritoId: number, juegoId: number) {
        await prisma.carrito_Juego.create({ data: { carritoId, juegoId } });
        return prisma.carrito.findUnique({
            where: { id: carritoId },
            include: { juegos: { include: { juego: true } } }
        });
    }

    async eliminarJuego(carritoId: number, juegoId: number) {
        return prisma.carrito_Juego.deleteMany({
            where: {
                carritoId,
                juegoId
            }
        });
    }

    async vaciarCarrito(carritoId: number) {
        return prisma.carrito_Juego.deleteMany({
            where: { carritoId }
        });
    }
}
