import ReservaRepository from "../repositories/reserva.repository";
import HorarioRepository from "../repositories/horario.repository";
import BloqueoRepository from "../repositories/bloqueo.repository";
import { ValidationError, NotFoundError } from "../errors";

class ReservaService {
  private readonly reservaRepository: ReservaRepository;
  private readonly horarioRepository: HorarioRepository;
  private readonly bloqueoRepository: BloqueoRepository;

  constructor() {
    this.reservaRepository = new ReservaRepository();
    this.horarioRepository = new HorarioRepository();
    this.bloqueoRepository = new BloqueoRepository();
  }

  // =====================================
  // OBTENER RESERVAS DEL USUARIO
  // =====================================

  async getReservasByUsuario(idUsuario: number) {
    if (!idUsuario) {
      throw new ValidationError("El usuario es requerido");
    }

    return await this.reservaRepository.findByUsuario(idUsuario);
  }

  // =====================================
  // OBTENER RESERVA POR ID
  // =====================================

  async getReserva(
    idReserva: string,
    idUsuario: number
  ) {
    if (!idReserva) {
      throw new ValidationError(
        "El id de la reserva es requerido"
      );
    }

    const reserva =
      await this.reservaRepository.findById(idReserva);

    if (!reserva) {
      throw new NotFoundError(
        "Reserva no encontrada"
      );
    }

    if (reserva.id_usuario !== idUsuario) {
      throw new NotFoundError(
        "Reserva no encontrada"
      );
    }

    return reserva;
  }

  // =====================================
  // CREAR RESERVA
  // =====================================

  async createReserva(
    idUsuario: number,
    idHorario: number
  ) {
    if (!idUsuario) {
      throw new ValidationError(
        "El usuario es requerido"
      );
    }

    if (!idHorario) {
      throw new ValidationError(
        "El horario es requerido"
      );
    }

    // 1. Comprobar que el horario exista.
    const horario =
      await this.horarioRepository.findById(idHorario);

    if (!horario) {
      throw new NotFoundError(
        "Horario no encontrado"
      );
    }

    // 2. Comprobar que esté habilitado.
    if (horario.estado !== "Habilitado") {
      throw new ValidationError(
        "El horario no está habilitado"
      );
    }

    // 3. Comprobar que no esté bloqueado.
    const bloqueo =
      await this.bloqueoRepository.findByHorario(
        idHorario
      );

    if (bloqueo) {
      throw new ValidationError(
        "El horario se encuentra bloqueado"
      );
    }

    // 4. Comprobar que no tenga una reserva activa.
    const reservaActiva =
      await this.reservaRepository.findActivaByHorario(
        idHorario
      );

    if (reservaActiva) {
      throw new ValidationError(
        "El horario ya se encuentra reservado"
      );
    }

    // 5. Crear la reserva.
    return await this.reservaRepository.create(
      idUsuario,
      idHorario
    );
  }

  // =====================================
  // CANCELAR RESERVA
  // =====================================

  async cancelReserva(
    idReserva: string,
    idUsuario: number
  ) {
    if (!idReserva) {
      throw new ValidationError(
        "El id de la reserva es requerido"
      );
    }

    const reserva =
      await this.reservaRepository.findById(idReserva);

    if (!reserva) {
      throw new NotFoundError(
        "Reserva no encontrada"
      );
    }

    if (reserva.id_usuario !== idUsuario) {
      throw new ValidationError(
        "No puede cancelar una reserva de otro usuario"
      );
    }

    if (reserva.estado !== "Activa") {
      throw new ValidationError(
        "La reserva no se encuentra activa"
      );
    }

    const reservaCancelada =
      await this.reservaRepository.cancel(
        idReserva,
        idUsuario
      );

    if (!reservaCancelada) {
      throw new ValidationError(
        "No fue posible cancelar la reserva"
      );
    }

    return reservaCancelada;
  }
}

export default ReservaService;