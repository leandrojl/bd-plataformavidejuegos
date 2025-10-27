import { UsuarioJuegoRepository } from "../repository/usuario-juego.repository.js";

export class UsuarioJuegoService {
  constructor(private usuarioJuegoRepository: UsuarioJuegoRepository) {}

  async agregarJuegoAUsuario(usuarioId: number, juegoId: number) {
    return this.usuarioJuegoRepository.crearRelacion(usuarioId, juegoId);
  }

  async obtenerJuegosDeUsuario(usuarioId: number) {
    return this.usuarioJuegoRepository.obtenerJuegosDeUsuario(usuarioId);
  }

  async obtenerUsuariosDeJuego(juegoId: number) {
    return this.usuarioJuegoRepository.obtenerUsuariosDeJuego(juegoId);
  }

  async eliminarJuegoDeUsuario(usuarioId: number, juegoId: number) {
    return this.usuarioJuegoRepository.eliminarRelacion(usuarioId, juegoId);
  }
}