# Backend de Productos

Backend en Node.js + Express + TypeScript que gestiona productos persistidos en PostgreSQL. La aplicación sigue una estructura por capas para separar responsabilidades:

- **Rutas**: definen las URL y los métodos HTTP.
- **Controladores**: reciben la petición HTTP y responden al cliente.
- **Servicios**: contienen la lógica de negocio y las validaciones.
- **Repositorios**: ejecutan las consultas SQL contra la base de datos.
- **Modelos**: describen la forma de los datos (`Product`).

## Estructura del proyecto

```
index.ts                              # arranca el servidor Express
src/
  database/db.ts                      # pool de conexión a PostgreSQL y creación de tablas
  models/product.ts                   # interfaz Product
  repositories/product.repository.ts  # queries SQL sobre la tabla products
  services/product.service.ts         # validaciones y reglas de negocio
  controllers/product.controller.ts   # maneja request/response de cada endpoint
  routes/product.routes.ts            # define las rutas del recurso productos
```

## Cómo funciona el flujo

### 1. Inicio del servidor

En [index.ts](index.ts) se crea la aplicación Express, se habilita JSON y se monta el router de productos bajo `/api/productos`:

```ts
app.use(express.json());
app.use("/api/productos", productRoutes);
```

Antes de aceptar solicitudes, se llama a `ensureProductsTable()` para verificar (y crear si hace falta) la tabla `products` en la base de datos.

### 2. Rutas

En `src/routes/product.routes.ts`:

- `GET /api/productos` → obtener todos los productos.
- `GET /api/productos/:id` → obtener un producto por id.
- `POST /api/productos` → crear un producto.
- `PUT /api/productos/:id` → actualizar un producto existente.
- `DELETE /api/productos/:id` → eliminar un producto.

### 3. Controlador

El controlador (`ProductController`) toma los datos de la request (`params`/`body`), delega la lógica al servicio y responde con el JSON o el código de estado correspondiente (por ejemplo `404` si el producto no existe).

### 4. Servicio

`ProductService` valida las reglas de negocio antes de delegar al repositorio, por ejemplo:

```ts
if (!name.trim()) {
  throw new Error("Name es requerido");
}
if (price <= 0) {
  throw new Error("Price debe ser mayor a 0");
}
```

### 5. Repositorio

`ProductRepository` ejecuta las consultas SQL sobre la tabla `products` usando el pool de `pg` (`findAll`, `findById`, `create`, `update`, `delete`).

### 6. Base de datos

`src/database/db.ts` crea un `Pool` de PostgreSQL usando variables de entorno (ver sección siguiente) y expone `ensureProductsTable()`, que ejecuta:

```sql
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL
)
```

## Variables de entorno

La conexión a PostgreSQL se configura mediante un archivo `.env` en la **raíz del repositorio** (compartido con `docker-compose.yml`):

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=tds2026
POSTGRES_USER=ingresa_tu_usuario_aqui
POSTGRES_PASSWORD=ingresa_tu_contraseña_aqui
```

## Base de datos con Docker

Desde la raíz del repositorio puedes levantar PostgreSQL con:

```bash
docker compose up -d
```

## Inicialización del proyecto

1. Instala las dependencias:

```bash
npm install
```

2. Asegúrate de tener el archivo `.env` en la raíz del repositorio (ver sección anterior) y la base de datos corriendo.

3. Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

4. El proyecto quedará disponible en:

```
http://localhost:3000
```

> También puedes compilar y ejecutar la versión compilada:
>
> ```bash
> npm run build
> npm start
> ```

## Dependencias utilizadas

- `express`: framework para crear la API REST y manejar rutas y peticiones HTTP.
- `pg`: cliente de PostgreSQL para conectarse a la base de datos.
- `dotenv`: carga las variables de entorno desde el archivo `.env`.
- `tsx`: ejecuta TypeScript directamente en desarrollo (`npm run dev`).
- `typescript`: compilador usado para generar el build de producción.

## Ejemplo con curl

```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"name":"Teclado","price":120000}'
```

## Observaciones

- Los datos se persisten en PostgreSQL, no en memoria.
- La tabla `products` se crea automáticamente al iniciar el servidor si no existe.
- La separación en capas (rutas, controladores, servicios, repositorios) ayuda a mantener el código ordenado y escalable.
