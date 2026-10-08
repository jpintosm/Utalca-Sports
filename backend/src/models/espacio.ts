export interface EspacioDeportivo {
  id_espacio: number;
  id_tipo: number;
  tipo: string;
  nombre: string;
  ubicacion: string | null;
  descripcion: string | null;
  precio: number | null;
  estado: string;
}