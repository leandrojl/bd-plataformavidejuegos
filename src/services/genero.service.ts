import type {GeneroRepository} from "../repository/genero.repository.js";

export class GeneroService{
    constructor(private generoRepository: GeneroRepository){}

    public obtenerGeneros = async()=>{
        return this.generoRepository.obtenerGeneros();
    }

    public obtenerGeneroPorId = async(id:number)=>{
        return this.generoRepository.obtenerGeneroPorId(id);
    }

    public eliminarGenero = async(id:number)=>{
        return this.generoRepository.eliminarGenero(id);
    }
}
