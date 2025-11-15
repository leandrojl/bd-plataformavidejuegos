import { prisma } from "../prisma.js";

export class PlataformaRepository{

    async obtenerPlataformas(){
        return prisma.plataforma.findMany();
    }

    async obtenerPlataformaPorId(id:number){
        return prisma.plataforma.findUnique({ where:{ id } });
    }

    async eliminarPlataforma(id:number){
        return prisma.plataforma.delete({ where:{ id } });
    }
}
