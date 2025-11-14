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

 

  async findAllUsuarios() {
    return prisma.usuario.findMany();
  }

 async createUsuario(data: {
    nombre?: string | null;
    apellido?: string | null;
    email: string;
    direccion?: string | null;
    password: string;
  }) {
    return prisma.usuario.create({
      data: {
        nombre: data.nombre ?? null,
        apellido: data.apellido ?? null,
        email: data.email,
        direccion: data.direccion ?? null,
        password: data.password,
        tipoUsuario: { connect: { id: 1 } }
      }
    });
  }
}
