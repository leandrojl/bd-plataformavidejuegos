import {type Request, type Response} from "express"
import {UsuarioService} from '../services/usuario.service.js';
import {UsuarioRepository} from "../repository/usuario.repository.js";

const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);

export class UsuarioController {
    constructor(){}

    public getUsuarios = async (req: Request, res: Response) =>{
        try{
            const usuarios = await usuarioService.obtenerUsuarios();
            console.log(usuarios);

            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({message: 'Error al obtener los usuarios', error});
        }
    }

    public getUsuario = async (req:Request, res:Response) =>{
        try{
            const id = Number(req.params["id"]);

            if(isNaN(id)){
                return res.status(400).json({message: 'ID de usuario inválido'});
            }

            const usuario = await usuarioService.obtenerUsuarioPorId(id);

            if(!usuario){
                return res.status(404).json({message: 'Usuario no encontrado'});
            }
            
            return res.status(200).json(usuario);

        } catch (error) {
            return res.status(500).json({message: 'Error al obtener el usuario', error});
        }
    }


  public loginUsuario = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const resultado = await usuarioService.verificarCredenciales(email, password);

        if (resultado.error === "EMAIL_NO_ENCONTRADO") {
            return res.status(404).json({ error: "EMAIL_NO_ENCONTRADO" });
        }

        if (resultado.error === "PASSWORD_INCORRECTA") {
            return res.status(401).json({ error: "PASSWORD_INCORRECTA" });
        }

        return res.status(200).json(resultado.usuario);

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({ error: "ERROR_LOGIN" });
    }
};



   public crearUsuario = async (req: Request, res: Response) => {
    try {
        const { nombre, apellido, email, direccion, password } = req.body;

        const usuario = await usuarioService.crearUsuario(
            nombre,
            apellido,
            email,
            direccion ?? null,
            password
        );

        return res.status(201).json(usuario);

    } catch (error: any) {

        if (error.code === 'P2002') {
            return res.status(409).json({
                message: 'El email ya está registrado'
            });
        }

        if (error.message) {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error('Error inesperado al crear usuario:', error);

        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}


    async getSaldo(req: Request, res: Response) {
        try {
            const id = Number(req.params.id); 

    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(409).json({
                message: 'El email ya está registrado',
                field: error.meta?.target?.[0]
            });
        }

        console.error('Error al crear usuario:', error);
        return res.status(500).json({
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};


}

