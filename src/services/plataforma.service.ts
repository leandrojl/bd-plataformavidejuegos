import type {PlataformaRepository} from "../repository/plataforma.repository.js";

export class PlataformaService{
    constructor(private plataformaRepository: PlataformaRepository){}

    public obtenerPlataformas = async()=>{
        return this.plataformaRepository.obtenerPlataformas();
    }

    public obtenerPlataformaPorId = async(id:number)=>{
        return this.plataformaRepository.obtenerPlataformaPorId(id);
    }

    public eliminarPlataforma = async(id:number)=>{
        return this.plataformaRepository.eliminarPlataforma(id);
    }
}
