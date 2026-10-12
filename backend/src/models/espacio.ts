export interface EspacioDeportivo {
  id_espacio: number;
  id_tipo: number;
  nombre: string;
  ubicacion: string | null;
  descripcion: string | null;
  precio: number | null;
  estado: string;
}

export interface EspacioDeportivoDetalle extends EspacioDeportivo {
  tipo: string;
}