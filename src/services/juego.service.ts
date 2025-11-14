import type {JuegoRepository} from "../repository/juego.repository.js";

export class JuegoService{
    constructor(private juegoRepository: JuegoRepository){}

    public obtenerJuegos = async()=>{
        return this.juegoRepository.obtenerJuegosConPlataformasYGeneros();
    }
    
    public obtenerJuegoPorId = async(id:number)=>{
        return this.juegoRepository.obtenerJuegoPorId(id);
    }

    public eliminarJuego = async(id:number)=>{
        return this.juegoRepository.eliminarJuego(id);
    }

    public obtenerImagenesDeUnJuego = async(id:number) => {
        return this.juegoRepository.obtenerImagenes(id);
    }

    public obtenerReviewsDeUnJuego = async(id:number) => {
        return this.juegoRepository.obtenerReviews(id);
    }
    public agregarReviewAJuego = async(id:number, reviewData:any) => {
        return this.juegoRepository.agregarReview(id, reviewData);
    }
}