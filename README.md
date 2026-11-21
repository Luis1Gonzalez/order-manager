# Gestor de pedidos · El Bodegón de las Carnes

Web para que los clientes registrados encarguen carne por internet y la carnicería gestione los pedidos desde un panel.

> Proyecto de portafolio: la carnicería y sus datos son ficticios. La versión publicada funciona en **modo demo** y cualquiera puede probarla.

- **Clientes**: entran con su teléfono registrado, arman el pedido por categorías (kg, g o unidades), lo confirman y reciben un ticket imprimible. Ven el estado de sus últimos pedidos.
- **Panel** (`/admin`): pedidos con auto-refresco, checklist de preparación, estados *Pendiente → Listo → Entregado / Cancelado*, gestión de clientes, catálogo editable y publicaciones con imagen.

## Probar la demo

**🔗 [pedidos-carniceria.netlify.app](https://pedidos-carniceria.netlify.app/)**

| Rol | Acceso |
|---|---|
| Cliente | Teléfono `600 000 000` y cualquier nombre |
| Administrador | `/admin` con usuario `demo` y contraseña `demo1234` |

Los datos vuelven a su estado inicial cada noche. También puedes restablecerlos desde el panel con **Restablecer ahora**.

## Guía para la carnicería: preparar pedidos

**Entrar al panel.** Ve a `/admin`, o al enlace **🔒 Admin** del pie de la portada, e inicia sesión. La sesión dura 8 horas.

**Ver los pedidos.** Al entrar llegas a **Pedidos**:
- Arriba hay tres contadores: *Pendientes*, *Listos para retirar* y *Recibidos hoy*.
- La lista **Activos** muestra primero los pedidos más antiguos, que son los que hay que preparar antes. El icono 💬 indica que el cliente dejó un comentario.
- La página se actualiza sola cada 30 segundos. Puedes dejarla abierta en una tablet del mostrador.

**Preparar un pedido.**
1. Abre el pedido: verás quién lo recoge, su teléfono, el comentario y los productos con sus cantidades.
2. Toca cada producto según lo prepares para marcarlo ✓. La barra verde muestra el progreso.
3. Pulsa **Marcar como listo**. El cliente lo verá como *Listo para retirar*.
4. Cuando lo recojan, pulsa **Marcar como entregado**.

Desde el detalle también puedes **imprimir** el pedido, **cancelarlo** o **reabrirlo** si lo cerraste por error. En la lista principal tienes los botones rápidos **Marcar listo** y **Entregado**.

**Otras secciones del panel:**
- **Clientes:** da de alta a los clientes con su teléfono. Solo los clientes activos pueden pedir.
- **Catálogo:** crea categorías y productos, y oculta un producto cuando no haya existencias.
- **Publicaciones:** ofertas y novedades con foto, que aparecen en la portada.

> En el móvil o la tablet, abre `/admin` y usa **Añadir a pantalla de inicio** para tener el panel como si fuera una app.

## Stack

Next.js 15 (App Router, Server Actions) · React 19 · Tailwind CSS 4 · Prisma 6 + PostgreSQL (Supabase) · Supabase Storage · Zod · sesiones JWT en cookie httpOnly (`jose`) · contraseñas con `bcryptjs` · Netlify.

## Puesta en marcha (local)

```bash
npm install
cp .env.example .env            # y rellena los valores (ver más abajo)
npm run db:deploy               # crea las tablas
npm run db:seed                 # crea el admin y los datos iniciales
npm run dev                     # http://localhost:3000
```

Para trabajar sin conexión, puedes usar un Postgres local sin Docker: `npx prisma dev --name order-manager --detach`. En ese caso, añade `&pgbouncer=true&connection_limit=1` al final de `DATABASE_URL` (ese servidor solo admite una conexión) y pon en `DIRECT_URL` la misma URL sin esos parámetros.

## Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com) con la Data API **desactivada**. Guarda la contraseña de la base de datos.
2. Pulsa **Connect** → **ORMs** → **Prisma** y copia las dos URLs en `.env`:
   - `DATABASE_URL`: con pooler, puerto **6543**. Añade `&connection_limit=1` al final.
   - `DIRECT_URL`: puerto **5432**, para las migraciones.
3. En **Project Settings → API Keys**, crea una *secret key* (empieza por `sb_secret_`) y ponla en `SUPABASE_SECRET_KEY`. El bucket `publicaciones` para las fotos se crea solo con la primera subida.
4. Ejecuta `npm run db:deploy` y `npm run db:seed`.

> La app accede a la base de datos y al almacenamiento solo desde el servidor. Ninguna clave de Supabase llega al navegador.

## Modo demo

Con `DEMO_MODE="true"`:

- La portada muestra un aviso con los accesos de prueba, y los formularios de acceso tienen un botón para rellenarlos.
- `npm run db:seed` crea el admin `demo` y **borra y vuelve a cargar** los datos de ejemplo (clientes, catálogo, publicaciones y pedidos en distintos estados).
- El cliente de prueba no se puede borrar ni desactivar.
- La función programada [`netlify/functions/reset-demo.mjs`](netlify/functions/reset-demo.mjs) restablece los datos cada noche a las 04:00 UTC. Para ello llama a `/api/demo/reset` con `DEMO_RESET_SECRET`.

Para usarlo con una carnicería real, pon `DEMO_MODE="false"`.

## Despliegue en Netlify

1. En [app.netlify.com](https://app.netlify.com) pulsa **Add new project → Import an existing project → GitHub** y elige este repositorio. Netlify detecta Next.js automáticamente; la configuración está en [`netlify.toml`](netlify.toml).
2. En **Project configuration → Environment variables**, añade todas las variables de `.env.example` con tus valores.
3. Despliega. Cada vez que cambie el esquema, aplica las migraciones con `npm run db:deploy` contra Supabase.

## Estructura

```
app/
  page.js                 Portada pública
  pedido/                 Crear pedido y ticket (requiere sesión de cliente)
  admin/login/            Acceso del administrador
  admin/(panel)/          Pedidos, clientes, catálogo, publicaciones
  actions/                Server Actions (toda la lógica que escribe en la BD)
  api/demo/reset/         Restablecimiento nocturno de la demo
components/               UI (ui/), web pública (site/), pedido (order/), panel (admin/)
lib/                      BD, sesiones, validaciones, almacenamiento, modo demo, datos del negocio (site.js)
prisma/                   Esquema, migraciones, seed, catálogo y datos de demo
netlify/functions/        Función programada de Netlify
middleware.js             Protege /admin y /pedido
```

Los datos del negocio (dirección, teléfono, redes, horario) están en [`lib/site.js`](lib/site.js).

## Seguridad

- Las sesiones van firmadas y en cookies httpOnly. Cada Server Action vuelve a comprobar la sesión: el middleware no es la única barrera.
- Las contraseñas de admin se guardan con hash bcrypt y nunca llegan al navegador.
- Todas las entradas se validan con Zod en el servidor. Un cliente solo puede ver sus propios pedidos.
- Las imágenes se suben a Supabase Storage desde el servidor. Se validan el tipo y el tamaño (máximo 4 MB).
- **No subas nunca `.env` al repositorio**. Está en `.gitignore`.
