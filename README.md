# Gestor de pedidos · El Bodegón de las Carnes

Web para que los clientes registrados encarguen carne por internet y la carnicería gestione los pedidos desde un panel.

- **Clientes**: entran con su teléfono registrado, arman el pedido por categorías (kg, g o unidades), lo confirman y reciben un ticket imprimible. Ven el estado de sus últimos pedidos.
- **Panel** (`/admin`): pedidos con auto-refresco, checklist de preparación, estados *Pendiente → Listo → Entregado / Cancelado*, gestión de clientes, catálogo editable y publicaciones con imagen.

## Stack

Next.js 15 (App Router, Server Actions) · React 19 · Tailwind CSS 4 · Prisma 6 + PostgreSQL · Zod · sesiones JWT en cookie httpOnly (`jose`) · contraseñas con `bcryptjs` · Cloudinary.

## Puesta en marcha (local)

```bash
npm install
cp .env.example .env            # y rellena los valores
npx prisma dev --name order-manager --detach   # Postgres local sin Docker (o usa uno propio)
npm run db:migrate              # crea las tablas
npm run db:seed                 # crea el admin y el catálogo inicial
npm run dev                     # http://localhost:3000
```

> Con `prisma dev`, añade `&pgbouncer=true&connection_limit=1` al final de `DATABASE_URL`, porque ese servidor local solo admite una conexión. Pon en `DIRECT_URL` la misma URL sin esos parámetros.

## Base de datos en Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com). Guarda la contraseña de la base de datos.
2. Pulsa **Connect** → **ORMs** → **Prisma** y copia las dos URLs:
   - `DATABASE_URL`: con pooler, puerto **6543**, terminada en `?pgbouncer=true&connection_limit=1`.
   - `DIRECT_URL`: puerto **5432**, para las migraciones.
3. Pon ambas en tu `.env` y crea las tablas y los datos iniciales:
   ```bash
   npm run db:deploy
   npm run db:seed
   ```

> Las tablas se crean con Prisma. No uses la API REST de Supabase (`anon key`) con estas tablas: la app accede siempre desde el servidor.

## Despliegue (Vercel)

1. Importa el repositorio en Vercel.
2. Define las variables de `.env.example`: `DATABASE_URL`, `DIRECT_URL`, `SESSION_SECRET` y las de Cloudinary.
3. Cada vez que cambie el esquema, aplica las migraciones con `npm run db:deploy` contra Supabase.

## Estructura

```
app/
  page.js                 Portada pública
  pedido/                 Crear pedido y ticket (requiere sesión de cliente)
  admin/login/            Acceso del administrador
  admin/(panel)/          Pedidos, clientes, catálogo, publicaciones
  actions/                Server Actions (toda la lógica que escribe en la BD)
components/               UI (ui/), web pública (site/), pedido (order/), panel (admin/)
lib/                      BD, sesiones, validaciones, Cloudinary, datos del negocio (site.js)
prisma/                   Esquema, migraciones y seed
middleware.js             Protege /admin y /pedido
```

Los datos del negocio (dirección, teléfono, redes, horario) están en [`lib/site.js`](lib/site.js).

## Seguridad

- Las sesiones van firmadas y en cookies httpOnly. Cada Server Action vuelve a comprobar la sesión: el middleware no es la única barrera.
- La contraseña del admin se guarda con hash bcrypt y nunca llega al navegador.
- Todas las entradas se validan con Zod en el servidor. Un cliente solo puede ver sus propios pedidos.
- Las imágenes se suben a Cloudinary desde el servidor, con firma. El API secret nunca sale del servidor.
- **No subas nunca `.env` al repositorio**. Está en `.gitignore`.
