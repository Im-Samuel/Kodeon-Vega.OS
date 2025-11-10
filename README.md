# Kodeon Vega.OS — Sitio de Hotel con Reservas

Proyecto web estático (HTML/CSS/JS) para un hotel con flujo de reservas y un login unificado para clientes y personal. No requiere backend: todo se gestiona con LocalStorage del navegador.

## Vista general

- Páginas públicas: inicio, servicios, nosotros, formulario de reserva.
- Login unificado (una sola página) que permite iniciar sesión como:
	- Cliente registrado (vía LocalStorage)
	- Personal del hotel (usuarios predefinidos en el código)
- Panel de reservas protegido con control básico de rol (ver/gestionar reservas).
- Indicador de sesión mediante avatar con iniciales y menú contextual (panel y cerrar sesión).

## Estructura de carpetas

```
.
├─ assets/
│  ├─ css/
│  │  ├─ site.css            # Estilos de secciones del sitio (hero, grids, etc.)
│  │  └─ stylelogin.css      # Navbar, formularios, avatar y estilos generales
│  └─ js/
│     ├─ Auth.js             # Gestión de sesión (localStorage)
│     ├─ avatar.js           # UI del avatar + dropdown (perfil / logout)
│     ├─ Reserva.js          # Lógica del formulario de reservas
│     ├─ reservas-page.js    # Render de reservas en el panel + permisos
│     ├─ login-cliente.js    # Login unificado (cliente + personal)
│     ├─ registro-cliente.js # Registro de clientes
│     ├─ Sesion.js           # Usuarios del personal (hardcodeado)
│     └─ seed-cliente.js     # (Opcional) Usuario demo para pruebas
├─ html/
│  ├─ index.html             # Inicio
│  ├─ servicios.html         # Servicios
│  ├─ nosotros.html          # Sobre el hotel
│  ├─ Reserva.html           # Formulario de reserva
│  ├─ Registro.html          # Registro de clientes
│  ├─ LoginCliente.html      # Único login para clientes y personal
│  └─ reservas/
│     └─ panel.html          # Panel protegido de reservas
└─ README.md
```

## Cómo ejecutar

Este proyecto es estático. Puedes abrir directamente `html/index.html` en tu navegador o usar un servidor local (recomendado para rutas relativas y pruebas).

Opciones comunes:

- VS Code + extensión “Live Server” (recomendado): clic derecho en `html/index.html` → “Open with Live Server”.
- Abrir archivos directamente: doble clic en `html/index.html` (funciona, pero para algunas rutas el servidor local es más estable).

> Nota: En Windows, si usas rutas locales, las rutas relativas ya están pensadas para funcionar correctamente.

## Autenticación y roles

- Los datos de sesión se guardan en `localStorage` bajo la clave `hotel_auth`.
- Login unificado (`html/LoginCliente.html`):
	1) Intenta como cliente en `localStorage` (clave `clientes_reg`).
	2) Si no coincide, intenta como personal con los usuarios predefinidos de `assets/js/Sesion.js`.

Usuarios del personal (por defecto):

- Administrador: usuario `admin`, contraseña `123`, nombre `Fer`.
- Recepcionista: usuario `user`, contraseña `456`, nombre `Juan`.

Cliente demo (solo para pruebas):

- ID `demo`, contraseña `1234` (se siembra con `assets/js/seed-cliente.js`, incluido en `LoginCliente.html`).

## Flujos principales

1) Registro de cliente
- Ir a `html/Registro.html` y completar el formulario.
- Se guarda en `localStorage` → `clientes_reg`.

2) Inicio de sesión (único)
- Ir a `html/LoginCliente.html`.
- Puedes iniciar como cliente (ID + contraseña guardados) o como personal (`admin/123` o `user/456`).
- Redirige a `html/reservas/panel.html`.

3) Reservar
- Ir a `html/Reserva.html`.
- Validaciones: fecha con al menos 2 días de anticipación, campos obligatorios, etc.
- Las reservas se guardan en `localStorage` → `reservas`.

4) Panel de reservas (protegido)
- Ruta: `html/reservas/panel.html`.
- Si no hay sesión, redirige al login.
- Permisos:
	- Cliente: puede ver reservas.
	- Personal (Administrador/Recepcionista): puede eliminar reservas.

## Componentes clave (JS)

- `Auth.js`: loginComo(rol, id, nombre), getAuth(), logout(), initAuthBadge().
- `avatar.js`: avatar con iniciales; menú con “Panel de reservas” y “Cerrar sesión”. Ajusta rutas según si estás en `reservas/` o no.
- `Reserva.js`: maneja envío del formulario, validación y guardado en `reservas`.
- `reservas-page.js`: renderiza la tabla de reservas con acciones según rol.
- `login-cliente.js`: ahora es el login único; prueba cliente→personal, establece el rol correcto, redirige.
- `Sesion.js`: usuarios de personal hardcodeados.

## Pruebas manuales sugeridas

- Cliente demo: `demo` / `1234` → ver panel, sin botón Eliminar.
- Staff admin: `admin` / `123` → ver panel con opción Eliminar.
- Staff recepcionista: `user` / `456` → igual que admin respecto a Eliminar.
- Crear reservas en `Reserva.html` y comprobar listado en el panel.
- Cerrar sesión desde el avatar y verificar redirección al login.

---

Hecho con HTML, CSS y JavaScript vanilla. Diseñado para ser simple de correr y extender.

## Manual de Usuario

Se incluyen dos versiones en `docs/`:

- `docs/ManualUsuario.html` (lista para imprimir / exportar a PDF). Para PDF: abre en el navegador → Imprimir → Guardar como PDF.
- `docs/ManualUsuario.md` (editable en texto plano, compatible con conversión rápida a otros formatos).

Puedes abrir el HTML directamente en Microsoft Word y luego guardar como `.docx` si requieres un archivo Word.
