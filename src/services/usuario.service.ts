
import type {UsuarioRepository} from "../repository/usuario.repository.ts";


export class UsuarioService{
    constructor(private usuarioRepository: UsuarioRepository) {}

    public async obtenerUsuarios() {
        return await this.usuarioRepository.findAllUsuarios();
    }
    public async verificarCredenciales(email: string, password: string) {
         const usuario = await this.usuarioRepository.findByEmail(email);
        if (!usuario) return null;

        if (usuario.password !== password) return null;

         return usuario;
}


    public async obtenerUsuarioPorId(id:number){
        return await this.usuarioRepository.findById(id);
    }

       async crearUsuario(nombre: string, apellido: string, email: string, direccion: string | undefined, password: string) {

        if(!nombre || typeof nombre !== 'string'){
            throw new Error('El nombre es obligatorio y debe ser un string')
        }

        if(!apellido || typeof apellido !== 'string'){
            throw new Error('El apellido es obligatorio y debe ser un string')
        }

        if(!email || typeof email !== 'string'){
            throw new Error('El email es obligatorio y debe ser un string')
        }

        if(!password || typeof password !== 'string'){
            throw new Error('El password es obligatorio y debe ser un string')
        }

        if(!direccion && typeof direccion !== 'string'){
            throw new Error('La direccion debe ser un string')
        }

        return await this.usuarioRepository.createUsuario({
            nombre,
            apellido,
            email,
            direccion,
            password
        });
    }
}
