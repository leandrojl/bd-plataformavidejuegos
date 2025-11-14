export class JuegoService {
    juegoRepository;
    constructor(juegoRepository) {
        this.juegoRepository = juegoRepository;
    }

    obtenerJuegoPorId = async (id) => {
        return this.juegoRepository.obtenerJuegoPorId(id);
    };
    obtenerJuegosConOfertas = async () => {
        return this.juegoRepository.listarConOfertas();
    };

    listarOfertasActivas = async (limit) => {
        return this.juegoRepository.listarOfertasActivas(limit);
    };

      // si querés mantener compatibilidad con el método anterior:
    obtenerJuegos = async () => {
        return this.obtenerJuegosConOfertas();
    };

}
//# sourceMappingURL=juego.service.js.map