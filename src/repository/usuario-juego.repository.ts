import { prisma } from "../prisma.js";

export class UsuarioJuegoRepository {
  async crearRelacion(usuarioId: number, juegoId: number) {
    return prisma.usuario_Juego.create({ data: { usuarioId, juegoId, detalle: "" } });
  }

  async obtenerJuegosDeUsuario(usuarioId: number) {
    return prisma.usuario_Juego.findMany({
      where: { usuarioId },
      include: { 
        juego: {
          include: {
            mainImagen: true,
            plataformas: { include: { plataforma: true } },
            juego_generos: { include: { genero: true } }
          }
        }
      }
    });
  }

  async obtenerUsuariosDeJuego(juegoId: number) {
    return prisma.usuario_Juego.findMany({
      where: { juegoId },
      include: { usuario: true }
    });
  }

  async eliminarRelacion(usuarioId: number, juegoId: number) {
    return prisma.usuario_Juego.deleteMany({
      where: { usuarioId, juegoId }
    });
  }
}