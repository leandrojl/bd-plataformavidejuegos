import { prisma } from "../prisma.js";

export class UsuarioJuegoRepository {
  async crearRelacion(usuarioId: number, juegoId: number) {
    return prisma.Usuario_Juego.create({ data: { usuarioId, juegoId, detalle: "" } });
  }

  async obtenerJuegosDeUsuario(usuarioId: number) {
    return prisma.Usuario_Juego.findMany({
      where: { usuarioId },
      include: { juego: true }
    });
  }

  async obtenerUsuariosDeJuego(juegoId: number) {
    return prisma.Usuario_Juego.findMany({
      where: { juegoId },
      include: { usuario: true }
    });
  }

  async eliminarRelacion(usuarioId: number, juegoId: number) {
    return prisma.Usuario_Juego.deleteMany({
      where: { usuarioId, juegoId }
    });
  }
}