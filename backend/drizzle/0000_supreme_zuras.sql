CREATE TABLE "bloqueo" (
	"id_bloqueo" serial PRIMARY KEY NOT NULL,
	"id_horario" integer NOT NULL,
	"motivo" varchar(100) NOT NULL,
	"descripcion" text,
	"fecha_creacion" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "espacio_deportivo" (
	"id_espacio" serial PRIMARY KEY NOT NULL,
	"id_tipo" integer NOT NULL,
	"nombre" varchar(150) NOT NULL,
	"ubicacion" varchar(200),
	"descripcion" text,
	"precio" numeric(10, 2),
	"estado" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "horario" (
	"id_horario" serial PRIMARY KEY NOT NULL,
	"id_espacio" integer NOT NULL,
	"fecha" date NOT NULL,
	"hora_inicio" time NOT NULL,
	"hora_fin" time NOT NULL,
	"estado" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reserva" (
	"id_reserva" serial PRIMARY KEY NOT NULL,
	"id_usuario" integer NOT NULL,
	"id_horario" integer NOT NULL,
	"estado" varchar(20) NOT NULL,
	"fecha_creacion" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rol" (
	"id_rol" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tipo_espacio" (
	"id_tipo" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuario" (
	"id_usuario" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(100) NOT NULL,
	"apellido" varchar(100) NOT NULL,
	"correo" varchar(150) NOT NULL,
	"contrasena" varchar(255) NOT NULL,
	"id_rol" integer NOT NULL,
	"estado" varchar(20) NOT NULL,
	CONSTRAINT "usuario_correo_unique" UNIQUE("correo")
);
--> statement-breakpoint
ALTER TABLE "bloqueo" ADD CONSTRAINT "bloqueo_id_horario_horario_id_horario_fk" FOREIGN KEY ("id_horario") REFERENCES "public"."horario"("id_horario") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "espacio_deportivo" ADD CONSTRAINT "espacio_deportivo_id_tipo_tipo_espacio_id_tipo_fk" FOREIGN KEY ("id_tipo") REFERENCES "public"."tipo_espacio"("id_tipo") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "horario" ADD CONSTRAINT "horario_id_espacio_espacio_deportivo_id_espacio_fk" FOREIGN KEY ("id_espacio") REFERENCES "public"."espacio_deportivo"("id_espacio") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_usuario_usuario_id_usuario_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_horario_horario_id_horario_fk" FOREIGN KEY ("id_horario") REFERENCES "public"."horario"("id_horario") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_rol_rol_id_rol_fk" FOREIGN KEY ("id_rol") REFERENCES "public"."rol"("id_rol") ON DELETE no action ON UPDATE no action;