# Manual de Usuario — Hotel Vega.OS

Este manual guía a usuarios finales (clientes y personal) para usar el sitio del hotel: navegación, reservas e ingreso al panel.

## 1. Acceso y navegación

- Página de inicio: `html/index.html`
- Menú principal: Inicio, Servicios, Nosotros, Reservar, Iniciar sesión.
- Avatar (arriba a la derecha) visible tras iniciar sesión, con acceso al Panel y Cerrar sesión.

## 2. Crear una cuenta (cliente)

1. Navega a `html/Registro.html`.
2. Completa el formulario con tu ID, nombre y contraseña.
3. Tras registrarte, ve a Iniciar sesión.

## 3. Iniciar sesión (único)

1. Ve a `html/LoginCliente.html`.
2. Introduce tu Usuario o ID y tu contraseña.
3. Si eres cliente registrado, entrarás con rol "Cliente".
4. Si eres personal, utiliza las credenciales del hotel:
   - Administrador: usuario `admin` / contraseña `123`
   - Recepcionista: usuario `user` / contraseña `456`
5. Tras iniciar, serás redirigido al Panel de Reservas.

> Para pruebas rápidas también existe un cliente demo: ID `demo` / contraseña `1234`.

## 4. Realizar una reserva

1. Ir a `html/Reserva.html` desde el menú.
2. Completa los campos: nombre, teléfono, servicio, fecha (mínimo 2 días antes), hora y tipo de habitación.
3. Envía el formulario. La reserva se guarda en tu navegador (localStorage).

## 5. Panel de reservas

- Ruta: `html/reservas/panel.html`.
- Requiere sesión activa; si no, te redirige a Iniciar sesión.
- Permisos:
  - Cliente: puede ver las reservas.
  - Personal (Administrador/Recepcionista): puede eliminar reservas.

## 6. Cerrar sesión

- Click en el avatar (arriba derecha) → "Cerrar sesión".
- Volverás al login de clientes.

## 7. Preguntas frecuentes

- "No puedo iniciar sesión":
  - Verifica usuario/ID y contraseña.
  - Si eres cliente, asegúrate de haberte registrado.
  - Borra datos del sitio en el navegador (localStorage) y vuelve a intentar.
- "No veo el botón Eliminar en el panel":
  - Solo el personal del hotel (no clientes) puede eliminar.
- "No aparecen mis reservas":
  - Las reservas se guardan en el navegador actual; si cambias de navegador o borras datos, no se conservan.

## 8. Nota sobre privacidad

- Este proyecto guarda datos en tu propio navegador usando LocalStorage únicamente para fines de demostración.

---

© 2025 Hotel Vega.OS — Manual de Usuario