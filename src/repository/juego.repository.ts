import { prisma } from "../prisma.js";

export class JuegoRepository{

async agregarReview(id: number, reviewData: any) {
  return prisma.review.create({
    data: {
      descripcion: reviewData.descripcion,
      usuarioId: reviewData.usuarioId,
      juegoId: id
    }
  });
}

    async obtenerJuegos(){
        return prisma.juego.findMany();
    }   

    async obtenerJuegoPorId(id:number){
        return prisma.juego.findUnique({
            where:{id}
        });
    }
    
        async obtenerJuegosConPlataformasYGeneros() {
    const juegos = await prisma.juego.findMany({
        include: {
        plataformas: { include: { plataforma: true } },
        juego_generos: { include: { genero: true } },
        mainImagen: true,
        },
    });

    return juegos.map(j => ({
        id: j.id,
        nombre: j.nombre,
        //subtitulo: j.subtitulo,
        precio: j.precio,
        descripcion: j.descripcion,
        desarrolladorId: j.desarrolladorId,
        mainImagenId: j.mainImagenId,
        mainImagen: j.mainImagen,
        plataforma: (j.plataformas ?? [])
        .map(p => p.plataforma)
        .filter(Boolean),
        genero: (j.juego_generos ?? [])
        .map(g => g.genero)
        .filter(Boolean),
    }));
    }



    async eliminarJuego(id:number){
        return prisma.juego.delete({
            where:{id}
        });
    }

    async obtenerImagenes(id:number){
        return prisma.imagen.findMany({
            where : {juegoId : id}
        })
    }

    async obtenerReviews(id: number) {
  return prisma.review.findMany({
    where: { juegoId: id },
    include: {
      usuario: {
        select: {
          nombre: true,
          apellido: true
        }
      }
    }
  });
}
}