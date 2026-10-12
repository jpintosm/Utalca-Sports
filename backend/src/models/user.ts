export interface User {
  id_usuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  id_rol: number;
  estado: string;
}

export interface UsuarioConRol extends User {
  rol: string;
}