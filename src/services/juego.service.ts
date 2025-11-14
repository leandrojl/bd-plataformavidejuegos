import type {JuegoRepository} from "../repository/juego.repository.js";

export class JuegoService{
    constructor(private juegoRepository: JuegoRepository){}

  /*  public obtenerJuegos = async()=>{
        return this.juegoRepository.obtenerJuegos();
    }*/
    
    public obtenerJuegoPorId = async(id:number)=>{
        return this.juegoRepository.obtenerJuegoPorId(id);
    }

    public eliminarJuego = async(id:number)=>{
        return this.juegoRepository.eliminarJuego(id);
    }

    public obtenerJuegosConOfertas = async () => {
        return this.juegoRepository.listarConOfertas();
    };

    public listarOfertasActivas = async (limit: number) => {
        return this.juegoRepository.listarOfertasActivas(limit);
    };

      // si querés mantener compatibilidad con el método anterior:
    public obtenerJuegos = async () => {
        return this.obtenerJuegosConOfertas();
    };
}