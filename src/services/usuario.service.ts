
import type { UsuarioRepository } from "../repository/usuario.repository.ts";

import * as bcrypt from 'bcrypt';

export class UsuarioService {
    constructor(private usuarioRepository: UsuarioRepository) { }

    public async obtenerUsuarios() {
        return await this.usuarioRepository.findAllUsuarios();
    }
    public async verificarCredenciales(email: string, password: string) {
        const usuario = await this.usuarioRepository.findByEmail(email);
        if (!usuario) return null;
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) return null;
        return usuario;
    }
public async obtenerUsuarioPorEmail(email: string) {
    return await this.usuarioRepository.findByEmail(email);
}

    public async obtenerUsuarioPorId(id: number) {
        return await this.usuarioRepository.findById(id);
    }

    async actualizarImagenes(usuarioId: number, data: { perfilUrl?: string | null; fondoPerfilUrl?: string | null }) {
        return this.usuarioRepository.actualizarImagenes(usuarioId, data);
    }

   async crearUsuario(
  nombre: string,
  apellido: string,
  email: string,
  direccion: string,
  password: string
) {
    const errores: string[] = [];

    if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
        errores.push('El nombre es obligatorio y debe tener mínimo 2 caracteres');
    }

    if (!apellido || typeof apellido !== 'string' || apellido.trim().length < 2) {
        errores.push('El apellido es obligatorio y debe tener mínimo 2 caracteres');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errores.push('El email ingresado no es válido');
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!password || !passRegex.test(password)) {
        errores.push('La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y carácter especial');
    }

    if (!direccion || direccion.trim().length < 3) {
        errores.push('La dirección debe tener al menos 3 caracteres');
    }

    if (errores.length > 0) {
        throw new Error(errores.join(', '));
    }

    const existingUser = await this.usuarioRepository.findByEmail(email);
    if (existingUser) {
        const error: any = new Error('El email ya está registrado');
        error.code = 'P2002';
        throw error;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return await this.usuarioRepository.createUsuario({
        nombre,
        apellido,
        email,
        direccion,
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
