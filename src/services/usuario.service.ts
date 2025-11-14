
import type {UsuarioRepository} from "../repository/usuario.repository.ts";
import bcrypt from 'bcrypt';

export class UsuarioService{
    constructor(private usuarioRepository: UsuarioRepository) {}

    public async obtenerUsuarios() {
        return await this.usuarioRepository.findAllUsuarios();
    }
   public async verificarCredenciales(email: string, password: string) {
    const usuario = await this.usuarioRepository.findByEmail(email);

    if (!usuario) {
        return { error: "EMAIL_NO_ENCONTRADO" };
    }

    const isMatch = await bcrypt.compare(password, usuario.password);

    if (!isMatch) {
        return { error: "PASSWORD_INCORRECTA" };
    }

    return { usuario };
}


    public async obtenerUsuarioPorId(id:number){
        return await this.usuarioRepository.findById(id);
    }


    /*
    async actualizarImagenes(usuarioId: number, data: { perfilUrl?: string | null; fondoPerfilUrl?: string | null }) {
        return this.usuarioRepository.actualizarImagenes(usuarioId, data);
    }
        */

    async crearUsuario(nombre: string, apellido: string, email: string, direccion: string | undefined, password: string) {


    if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
        throw new Error('El nombre es obligatorio y debe tener al menos 2 caracteres');
    }

    if (!apellido || typeof apellido !== 'string' || apellido.trim().length < 2) {
        throw new Error('El apellido es obligatorio y debe tener al menos 2 caracteres');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        throw new Error('El email ingresado no es válido');
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!password || typeof password !== 'string' || !passRegex.test(password)) {
        throw new Error('La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y carácter especial');
    }

    if (direccion !== undefined && typeof direccion !== 'string') {
        throw new Error('La dirección debe ser un string');
    }

    const existingUser = await this.usuarioRepository.findByEmail(email);
    if (existingUser) {
        const error: any = new Error('El email ya está registrado');
        error.code = 'P2002';
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usuarioRepository.createUsuario({
        nombre,
        apellido,
        email,
        direccion: direccion ?? null,
        password: hashedPassword
    });
}


    async descontarSaldo(id: number, monto: number) {
        const saldoActual = await this.usuarioRepository.obtenerSaldo(id);
        if (saldoActual === null) throw new Error('Usuario no encontrado');

        if (saldoActual < monto) throw new Error('Saldo insuficiente');

        const nuevoSaldo = saldoActual - monto;
        return await this.usuarioRepository.actualizarSaldo(id, nuevoSaldo);
    }

    async obtenerSaldo(id: number) {
        return await this.usuarioRepository.obtenerSaldo(id);
    }


}
