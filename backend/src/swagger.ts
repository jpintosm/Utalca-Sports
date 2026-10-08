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
      schemas: {
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
        // ERRORES
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

        // =====================================
        // PRODUCTOS
        // TEMPORAL: BASE DEL PROFESOR
        // =====================================

        Product: {
          type: "object",
          required: ["id", "name", "price"],
          properties: {
            id: {
              type: "integer",
              example: 1,
            },

            name: {
              type: "string",
              example: "Teclado",
            },

            price: {
              type: "number",
              example: 49.99,
            },
          },
        },

        ProductInput: {
          type: "object",
          required: ["name", "price"],
          properties: {
            name: {
              type: "string",
              minLength: 1,
              description:
                "Nombre del producto; no puede contener solo espacios",
              example: "Teclado",
            },

            price: {
              type: "number",
              minimum: 0,
              exclusiveMinimum: true,
              example: 49.99,
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

        // Temporal: base del profesor
        ProductId: {
          name: "id",
          in: "path",
          required: true,
          description: "Identificador del producto",
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
                message: "No tiene permisos para realizar esta acción",
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
                message: "Espacio deportivo no encontrado",
              },
            },
          },
        },

        // Temporal: base del profesor
        ProductNotFound: {
          description: "Producto no encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message: "Producto no encontrado",
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

  // Swagger buscará documentación en todas las rutas
  apis: ["./src/routes/*.ts"],
};

export default swaggerJsdoc(options);