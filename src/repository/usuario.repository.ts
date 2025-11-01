import {prisma} from "../prisma.js"

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
        connect: { id: 1 } // ID del tipo de usuario por defecto
      }
    }
  });
}

}
