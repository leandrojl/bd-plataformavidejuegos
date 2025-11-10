export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    direccion?: string | null;
    password: string;
    tipoUsuarioId?: number;  // ID del tipo de usuario (1 para usuario normal, etc.)
}
