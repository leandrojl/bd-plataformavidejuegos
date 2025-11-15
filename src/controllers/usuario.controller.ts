import { type Request, type Response } from "express"
import { UsuarioService } from '../services/usuario.service.js';
import { UsuarioRepository } from "../repository/usuario.repository.js";

const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);

export class UsuarioController {
    constructor() { }

    public getUsuarios = async (req: Request, res: Response) => {
        try {
            const usuarios = await usuarioService.obtenerUsuarios();
            console.log(usuarios);

            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los usuarios', error });
        }
    }

    public getUsuario = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params["id"]);

            if (isNaN(id)) {
                return res.status(400).json({ message: 'ID de usuario inválido' });
            }

            const usuario = await usuarioService.obtenerUsuarioPorId(id);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            return res.status(200).json(usuario);

        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener el usuario', error });
        }
    }

async actualizarImagenes(req: Request, res: Response) {
  const { id } = req.params;
  const { perfilUrl, fondoPerfilUrl } = req.body;

  try {
    const usuarioActualizado = await usuarioService.actualizarImagenes(Number(id), {
      perfilUrl,
      fondoPerfilUrl,
    });
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar imágenes" });
  }
}


  public loginUsuario = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ errors: ['Email y contraseña son obligatorios'] });
        }

        const usuario = await usuarioService.verificarCredenciales(email, password);

        if (!usuario) {
            const existeEmail = await usuarioService.obtenerUsuarioPorEmail(email);
            if (!existeEmail) {
                return res.status(404).json({ errors: ['El email ingresado no está registrado'] });
            } else {
                return res.status(401).json({ errors: ['La contraseña es incorrecta'] });
            }
        }

        return res.status(200).json(usuario);

    } catch (error: any) {
        return res.status(500).json({ errors: ['Error al iniciar sesión', error, error.message] });
    }
};




  public crearUsuario = async (req: Request, res: Response) => {
    try {
        const { nombre, apellido, email, direccion, password } = req.body;

        const usuario = await usuarioService.crearUsuario(nombre, apellido, email, direccion, password);
        return res.status(201).json(usuario);

    } catch (error: any) {

        if (error.code === 'P2002') {
            return res.status(409).json({
                message: 'El email ya está registrado',
                field: error.meta?.target?.[0]
            });
        }

        if (error.message) {
            const erroresArray = error.message.split(',').map((e: string) => e.trim());
            return res.status(400).json({
                errors: erroresArray
            });
        }

        return res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
};


    async getSaldo(req: Request, res: Response) {
        try {
            const id = Number(req.params.id); 

            if (isNaN(id)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const saldo = await usuarioService.obtenerSaldo(id);

            if (saldo === null) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            res.json({ saldo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener el saldo" });
        }
    }
    public async descontarSaldo(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { monto } = req.body;

            if (isNaN(id) || typeof monto !== 'number') {
                return res.status(400).json({ message: 'Datos inválidos' });
            }

            const usuarioActualizado = await usuarioService.descontarSaldo(id, monto);
            res.status(200).json(usuarioActualizado);
        } catch (error: any) {
            res.status(500).json({ message: error.message || 'Error al descontar saldo' });
        }
    }

}

