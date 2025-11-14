import { prisma } from "../prisma.js";

export class JuegoRepository{

    async obtenerJuegos(){
        return prisma.juego.findMany();
    }   

    async obtenerJuegoPorId(id:number){
        return prisma.juego.findUnique({
            where:{id}
        });
    }
    async eliminarJuego(id:number){
        return prisma.juego.delete({
            where:{id}
        });
    }
      //  listado general con cálculo de ofertas activas ---
      async listarConOfertas() {
        const juegos = await prisma.juego.findMany({
          include: {
            mainImagen: { select: { url: true } },
            imagenes: { select: { url: true }, take: 1 }
          }
        });
    
        const now = new Date();
        const ofertas = await prisma.oferta.findMany({
          where: { fechaInicio: { lte: now }, fechaFin: { gte: now } },
          select: { juegoId: true, descuento: true }
        });
    
        const mapOfertas = new Map(ofertas.map(o => [o.juegoId, o.descuento]));
    
        return juegos.map(j => {
          const descuento = mapOfertas.get(j.id);
          const finalPrice = descuento
            ? +(j.precio * (1 - descuento)).toFixed(2)
            : j.precio;
          return {
            id: j.id,
            nombre: j.nombre,
            descripcion: j.descripcion,
            precio: j.precio,
            discount: descuento ?? 0,
            finalPrice,
            coverUrl: j.mainImagen?.url ?? j.imagenes[0]?.url ?? ""
          };
        });
      }
      // --- NUEVO: juegos en oferta (para el carrusel del Home) ---
      async listarOfertasActivas(limit: number) {
        const now = new Date();
        const rows = await prisma.oferta.findMany({
          where: { fechaInicio: { lte: now }, fechaFin: { gte: now } },
          include: {
            juego: {
              include: {
                mainImagen: { select: { url: true } },
                imagenes: { select: { url: true }, take: 1 }
              }
            }
          },
          take: limit
        });
    
        return rows.map(o => ({
          id: o.juego.id,
          title: o.juego.nombre,
          originalPrice: o.juego.precio,
          discount: o.descuento,
          finalPrice: +(o.juego.precio * (1 - o.descuento)).toFixed(2),
          coverUrl: o.juego.mainImagen?.url ?? o.juego.imagenes[0]?.url ?? "",
          endsAt: o.fechaFin
        }));
      }
}