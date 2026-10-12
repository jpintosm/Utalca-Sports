export interface Bloqueo {
  id_bloqueo: number;
  id_horario: number;
  motivo: string;
  descripcion: string | null;
  fecha_creacion: string;
}