import type { CarritoRepository } from "../repository/carrito.repository.js";

export class CarritoService {
  constructor(private carritoRepository: CarritoRepository) {}

  async obtenerOCrearCarrito(usuarioId: number) {
    let carrito = await this.carritoRepository.obtenerCarritoPorUsuario(usuarioId);
    if (!carrito) {
      carrito = await this.carritoRepository.crearCarrito(usuarioId);
    }
    return carrito;
  }

  async agregarJuego(usuarioId: number, juegoId: number) {
    const carrito = await this.obtenerOCrearCarrito(usuarioId);
    return this.carritoRepository.agregarJuego(carrito.id, juegoId);
  }

  async eliminarJuego(usuarioId: number, juegoId: number) {
    const carrito = await this.carritoRepository.obtenerCarritoPorUsuario(usuarioId);
    if (!carrito) throw new Error("Carrito no encontrado");
    return this.carritoRepository.eliminarJuego(carrito.id, juegoId);
  }

  async vaciarCarrito(usuarioId: number) {
    const carrito = await this.carritoRepository.obtenerCarritoPorUsuario(usuarioId);
    if (!carrito) throw new Error("Carrito no encontrado");
    return this.carritoRepository.vaciarCarrito(carrito.id);
  }
}
