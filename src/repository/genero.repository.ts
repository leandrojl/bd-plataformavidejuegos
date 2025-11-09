import { prisma } from "../prisma.js";

export class GeneroRepository{

    async obtenerGeneros(){
        return prisma.genero.findMany();
    }

    async obtenerGeneroPorId(id:number){
        return prisma.genero.findUnique({ where:{ id } });
    }

    async eliminarGenero(id:number){
        return prisma.genero.delete({ where:{ id } });
    }
}
