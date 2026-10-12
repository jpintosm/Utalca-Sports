export interface Horario {
  id_horario: number;
  id_espacio: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado: string;
}

export interface DisponibilidadHorario extends Horario {
  disponible: boolean;
  disponibilidad: string;
}