import { prisma } from "../prisma.js";

export class UsuarioRepository {
  async findById(id: number) {
    return prisma.usuario.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return prisma.usuario.findUnique({
      where: { email },
    });
  }


    async actualizarImagenes(
  usuarioId: number,
  data: { perfilUrl?: string | null; fondoPerfilUrl?: string | null }
) {
  return prisma.usuario.update({
    where: { id: usuarioId },
    data: {
      perfilUrl: data.perfilUrl ?? null,
      fondoPerfilUrl: data.fondoPerfilUrl ?? null,
    },
  });
}

  async findAllUsuarios() {
    return prisma.usuario.findMany();
  }

  async createUsuario(data: {
    nombre: string;
    apellido: string;
    email: string;
    direccion?: string;
    password: string;
  }) {
    return prisma.usuario.create({
      data: {
        ...data,
        tipoUsuario: {
          connect: { id: 1 } 
        }
      }
    });
  }

  async obtenerSaldo(id: number) {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      select: { saldo: true },
    });
    return usuario ? usuario.saldo : null;
  }


  async obtenerCarrito(id: number) {
    return prisma.carrito.findFirst({
      where: { usuarioId: id },
      include: {
        juegos: {
          include: {
            juego: true // ✅ Esto incluye la info del juego
          }
        }
      }
    });
  }

  // async createCarrito(usuarioId: number) {
  //   return prisma.carrito.create({
  //   data: { usuarioId }
  // });
  // }

  async actualizarSaldo(id: number, nuevoSaldo: number) {
  return prisma.usuario.update({
    where: { id },
    data: { saldo: nuevoSaldo },
  });
}

}
