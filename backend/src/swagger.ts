import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "UTalca Sports API",
      version: "1.0.0",
      description:
        "API REST para la gestión y reserva de espacios deportivos de la Universidad de Talca.",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo",
      },
    ],

    components: {
      // =====================================
      // SCHEMAS
      // =====================================
      schemas: {
        Bloqueo: {
          type: "object",

          required: [
            "id_bloqueo",
            "id_horario",
            "motivo",
            "fecha_creacion",
          ],

          properties: {

            id_bloqueo: {
              type: "integer",
              example: 1,
            },

            id_horario: {
              type: "integer",
              example: 3,
            },

            motivo: {
              type: "string",
              example: "Mantención",
            },

            descripcion: {
              type: "string",
              nullable: true,
              example:
                "Mantención programada de la cancha",
            },

            fecha_creacion: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Reserva: {
          type: "object",
          required: [
            "id_reserva",
            "id_usuario",
            "id_horario",
            "estado",
            "fecha_creacion",
          ],
          properties: {
            id_reserva: {
              type: "integer",
              example: 1,
            },
            id_usuario: {
              type: "integer",
              example: 1,
            },
            id_horario: {
              type: "integer",
              example: 3,
            },
            estado: {
              type: "string",
              example: "Activa",
            },
            fecha_creacion: {
              type: "string",
              example: "2026-10-12 22:30:00",
            },
          },
        },

        ReservaDetalle: {
          type: "object",
          required: [
            "id_reserva",
            "id_usuario",
            "id_horario",
            "estado",
            "fecha_creacion",
            "nombre_espacio",
            "fecha",
            "hora_inicio",
            "hora_fin",
          ],
          properties: {
            id_reserva: {
              type: "integer",
              example: 1,
            },
            id_usuario: {
              type: "integer",
              example: 1,
            },
            id_horario: {
              type: "integer",
              example: 3,
            },
            estado: {
              type: "string",
              example: "Activa",
            },
            fecha_creacion: {
              type: "string",
              example: "2026-10-12 22:30:00",
            },
            nombre_espacio: {
              type: "string",
              example: "Cancha de Tenis 1",
            },
            ubicacion: {
              type: "string",
              nullable: true,
              example: "Campus Talca",
            },
            fecha: {
              type: "string",
              format: "date",
              example: "2026-10-15",
            },
            hora_inicio: {
              type: "string",
              example: "09:00:00",
            },
            hora_fin: {
              type: "string",
              example: "10:00:00",
            },
          },
        },
        // =====================================
        // ESPACIO DEPORTIVO
        // =====================================
        EspacioDeportivo: {
          type: "object",
          required: [
            "id_espacio",
            "id_tipo",
            "tipo",
            "nombre",
            "estado",
          ],
          properties: {
            id_espacio: {
              type: "integer",
              example: 1,
            },

            id_tipo: {
              type: "integer",
              example: 1,
            },

            tipo: {
              type: "string",
              example: "Tenis",
            },

            nombre: {
              type: "string",
              example: "Cancha de Tenis 1",
            },

            ubicacion: {
              type: "string",
              nullable: true,
              example: "Campus Talca",
            },

            descripcion: {
              type: "string",
              nullable: true,
              example: "Cancha exterior de tenis",
            },

            precio: {
              type: "number",
              format: "float",
              nullable: true,
              example: 5000,
            },

            estado: {
              type: "string",
              example: "Habilitado",
            },
          },
        },

        // =====================================
        // HORARIO
        // =====================================
        Horario: {
          type: "object",
          required: [
            "id_horario",
            "id_espacio",
            "fecha",
            "hora_inicio",
            "hora_fin",
            "estado",
          ],
          properties: {
            id_horario: {
              type: "integer",
              example: 1,
            },

            id_espacio: {
              type: "integer",
              example: 1,
            },

            fecha: {
              type: "string",
              format: "date",
              example: "2026-10-10",
            },

            hora_inicio: {
              type: "string",
              example: "09:00:00",
            },

            hora_fin: {
              type: "string",
              example: "10:00:00",
            },

            estado: {
              type: "string",
              example: "Habilitado",
            },
          },
        },

        // =====================================
        // DISPONIBILIDAD DE HORARIO
        // =====================================
        DisponibilidadHorario: {
          type: "object",
          required: [
            "id_horario",
            "id_espacio",
            "fecha",
            "hora_inicio",
            "hora_fin",
            "estado",
            "disponible",
            "disponibilidad",
          ],
          properties: {
            id_horario: {
              type: "integer",
              example: 1,
            },

            id_espacio: {
              type: "integer",
              example: 1,
            },

            fecha: {
              type: "string",
              format: "date",
              example: "2026-10-10",
            },

            hora_inicio: {
              type: "string",
              example: "09:00:00",
            },

            hora_fin: {
              type: "string",
              example: "10:00:00",
            },

            estado: {
              type: "string",
              example: "Habilitado",
            },

            disponible: {
              type: "boolean",
              example: true,
            },

            disponibilidad: {
              type: "string",
              enum: [
                "Disponible",
                "Reservado",
                "Bloqueado",
                "Deshabilitado",
              ],
              example: "Disponible",
            },
          },
        },

        // =====================================
        // ERROR
        // =====================================
        Error: {
          type: "object",
          required: ["message"],
          properties: {
            message: {
              type: "string",
              example: "Ha ocurrido un error",
            },
          },
        },

        // =====================================
        // ERROR INTERNO
        // =====================================
        InternalError: {
          type: "object",
          required: ["message", "error"],
          properties: {
            message: {
              type: "string",
              example: "Error interno del servidor",
            },

            error: {
              type: "object",
              additionalProperties: true,
            },
          },
        },
      },

      // =====================================
      // PARÁMETROS REUTILIZABLES
      // =====================================
      parameters: {
        EspacioId: {
          name: "id",
          in: "path",
          required: true,
          description: "Identificador del espacio deportivo",
          schema: {
            type: "integer",
            example: 1,
          },
        },

          ReservaId: {
          name: "id",
          in: "path",
          required: true,
          description: "Identificador de la reserva",
          schema: {
            type: "integer",
            example: 1,
          },
        },
      },

      // =====================================
      // RESPUESTAS REUTILIZABLES
      // =====================================
      responses: {
        BadRequest: {
          description: "Solicitud inválida",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message: "Datos inválidos",
              },
            },
          },
        },

        Unauthorized: {
          description: "Token JWT ausente, inválido o expirado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message: "Token es requerido",
              },
            },
          },
        },

        Forbidden: {
          description:
            "El usuario está autenticado, pero no tiene permisos para realizar esta acción",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message:
                  "No tiene permisos para realizar esta acción",
              },
            },
          },
        },

        EspacioNotFound: {
          description: "Espacio deportivo no encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message:
                  "Espacio deportivo no encontrado",
              },
            },
          },
        },

        InternalServerError: {
          description: "Error interno del servidor",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/InternalError",
              },
            },
          },
        },
      },

      // =====================================
      // SEGURIDAD JWT
      // =====================================
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Ingrese el token JWT obtenido al iniciar sesión.",
        },
      },
    },
  },

  // Swagger buscará documentación
  // en todos los archivos de routes.
  apis: ["./src/routes/*.ts"],
};

export default swaggerJsdoc(options);