// Módulo para manejar reservas: validación, almacenamiento en localStorage y renderizado

const FORM_KEY = 'reservas';

const form = document.getElementById('reservaForm');
const fechaInput = document.getElementById('fecha');

function diasAnticipacion() {
  return 2; // requerir 2 días de anticipación
}

function getMinDateISO() {
  const d = new Date();
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() + diasAnticipacion());
  return d.toISOString().split('T')[0];
}

function showMessage(text, type = 'success') {
  let msg = document.getElementById('mensaje-reserva');
  if (!msg) {
    msg = document.createElement('div');
    msg.id = 'mensaje-reserva';
    form.parentNode.insertBefore(msg, form);
  }
  msg.textContent = text;
  msg.className = 'mensaje-reserva ' + (type === 'error' ? 'error' : 'success');
}

function clearMessage() {
  const msg = document.getElementById('mensaje-reserva');
  if (msg) msg.textContent = '';
}

function loadReservas() {
  try {
    return JSON.parse(localStorage.getItem(FORM_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveReservas(list) {
  localStorage.setItem(FORM_KEY, JSON.stringify(list));
}

function validatePhone(phone) {
  const cleaned = (phone || '').replace(/[^0-9+]/g, '');
  return cleaned.length >= 7; // regla simple
}

function validateFechaHora(fechaStr, horaStr) {
  if (!fechaStr) return {ok:false, msg:'Seleccione una fecha.'};
  const min = new Date(getMinDateISO());
  const sel = new Date(fechaStr + 'T00:00:00');
  if (sel < min) return {ok:false, msg:`La fecha debe ser a partir de ${getMinDateISO()} (mínimo ${diasAnticipacion()} días).`};
  if (!horaStr) return {ok:false, msg:'Seleccione una hora.'};
  return {ok:true};
}

function renderReservations() {
  let container = document.getElementById('reserva-list-container');
  const reservas = loadReservas();
  if (!container) {
    container = document.createElement('div');
    container.id = 'reserva-list-container';
    form.parentNode.appendChild(container);
  }
  container.innerHTML = '';

  if (!reservas || reservas.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'reserva-empty';
    empty.textContent = 'No hay reservas registradas.';
    container.appendChild(empty);
    return;
  }

  const table = document.createElement('table');
  table.className = 'reserva-list';
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr><th>Nombre</th><th>Teléfono</th><th>Servicio</th><th>Fecha</th><th>Hora</th><th>Habitación</th></tr>';
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  reservas.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(r.nombre)}</td>
      <td>${escapeHtml(r.telefono)}</td>
      <td>${escapeHtml(r.servicio)}</td>
      <td>${escapeHtml(r.fecha)}</td>
      <td>${escapeHtml(r.hora)}</td>
      <td>${escapeHtml(r.habitacion)}</td>
    `;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function onSubmit(e) {
  e.preventDefault();
  clearMessage();

  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const servicio = document.getElementById('servicio').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const habitacion = document.getElementById('habitacion').value;
  const info = document.getElementById('info').value.trim();

  if (!nombre) return showMessage('Ingrese su nombre.', 'error');
  if (!validatePhone(telefono)) return showMessage('Ingrese un teléfono válido (mínimo 7 dígitos).', 'error');
  if (!servicio) return showMessage('Seleccione un servicio.', 'error');

  const fechaCheck = validateFechaHora(fecha, hora);
  if (!fechaCheck.ok) return showMessage(fechaCheck.msg, 'error');

  if (!habitacion) return showMessage('Seleccione el tipo de habitación.', 'error');

  const reserva = {
    id: Date.now(),
    nombre,
    telefono,
    servicio,
    fecha,
    hora,
    habitacion,
    info,
    creado: new Date().toISOString()
  };

  const reservas = loadReservas();
  reservas.push(reserva);
  saveReservas(reservas);

  showMessage('Reserva solicitada correctamente. Recibirá confirmación en breve.', 'success');
  form.reset();
  // volver a fijar min date
  setMinDate();
  renderReservations();
}

function setMinDate() {
  if (fechaInput) {
    fechaInput.setAttribute('min', getMinDateISO());
  }
}

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  if (!form) return;
  setMinDate();
  form.addEventListener('submit', onSubmit);
  renderReservations();
});

// Export nothing; es un módulo autoejecutable
export default {};
