import BloqueoRepository from "../repositories/bloqueo.repository";
import HorarioRepository from "../repositories/horario.repository";
import ReservaRepository from "../repositories/reserva.repository";
import { ValidationError, NotFoundError } from "../errors";

class BloqueoService {
  private readonly bloqueoRepository: BloqueoRepository;
  private readonly horarioRepository: HorarioRepository;
  private readonly reservaRepository: ReservaRepository;

  constructor() {
    this.bloqueoRepository = new BloqueoRepository();
    this.horarioRepository = new HorarioRepository();
    this.reservaRepository = new ReservaRepository();
  }

  async getBloqueo(idBloqueo: string) {
    if (!idBloqueo) {
      throw new ValidationError(
        "El id del bloqueo es requerido"
      );
    }

    const bloqueo =
      await this.bloqueoRepository.findById(
        idBloqueo
      );

    if (!bloqueo) {
      throw new NotFoundError(
        "Bloqueo no encontrado"
      );
    }

    return bloqueo;
  }

  async createBloqueo(
    idHorario: number,
    motivo: string,
    descripcion: string | null
  ) {
    if (!idHorario) {
      throw new ValidationError(
        "El horario es requerido"
      );
    }

    if (!motivo || !motivo.trim()) {
      throw new ValidationError(
        "El motivo es requerido"
      );
    }

    const horario =
      await this.horarioRepository.findById(
        idHorario
      );

    if (!horario) {
      throw new NotFoundError(
        "Horario no encontrado"
      );
    }

    const bloqueoExistente =
      await this.bloqueoRepository.findByHorario(
        idHorario
      );

    if (bloqueoExistente) {
      throw new ValidationError(
        "El horario ya se encuentra bloqueado"
      );
    }

    const reservaActiva =
      await this.reservaRepository.findActivaByHorario(
        idHorario
      );

    if (reservaActiva) {
      throw new ValidationError(
        "No se puede bloquear un horario con una reserva activa"
      );
    }

    return await this.bloqueoRepository.create(
      idHorario,
      motivo.trim(),
      descripcion?.trim() || null
    );
  }

  async removeBloqueo(idBloqueo: string) {
    if (!idBloqueo) {
      throw new ValidationError(
        "El id del bloqueo es requerido"
      );
    }

    const bloqueo =
      await this.bloqueoRepository.findById(
        idBloqueo
      );

    if (!bloqueo) {
      throw new NotFoundError(
        "Bloqueo no encontrado"
      );
    }

    return await this.bloqueoRepository.remove(
      idBloqueo
    );
  }
}

export default BloqueoService;