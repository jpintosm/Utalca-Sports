export interface Reserva {
  id_reserva: number;
  id_usuario: number;
  id_horario: number;
  estado: string;
  fecha_creacion: string;
}

//Más detallado y amigable con el usuario
export interface ReservaDetalle extends Reserva {
  nombre_espacio: string;
  ubicacion: string | null;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
}