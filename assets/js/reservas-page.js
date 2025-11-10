import { getAuth, logout } from './Auth.js';

const KEY = 'reservas';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; }
}
function save(list){ localStorage.setItem(KEY, JSON.stringify(list)); }

function render() {
  const auth = getAuth();
  const cont = document.getElementById('reservas-container');
  const info = document.getElementById('reservas-info');
  cont.innerHTML = '';

  const data = load();
  if (!data.length) {
    cont.innerHTML = '<div class="reserva-empty">No hay reservas registradas.</div>';
    return;
  }

  const table = document.createElement('table');
  table.className = 'reserva-list';
  const thead = document.createElement('thead');
  const puedeGestionar = !!auth && auth.rol !== 'Cliente';
  thead.innerHTML = '<tr><th>Nombre</th><th>Teléfono</th><th>Servicio</th><th>Fecha</th><th>Hora</th><th>Habitación</th>' + (puedeGestionar ? '<th>Acciones</th>' : '') + '</tr>';
  table.appendChild(thead);
  const tbody = document.createElement('tbody');

  data.forEach((r, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${esc(r.nombre)}</td>
      <td>${esc(r.telefono)}</td>
      <td>${esc(r.servicio)}</td>
      <td>${esc(r.fecha)}</td>
      <td>${esc(r.hora)}</td>
      <td>${esc(r.habitacion)}</td>
    `;
    if (puedeGestionar) {
      const td = document.createElement('td');
      const del = document.createElement('button');
      del.textContent = 'Eliminar';
      del.className = 'btn-login';
      del.style.padding = '6px 10px';
      del.addEventListener('click', () => {
        const list = load();
        list.splice(idx,1);
        save(list);
        render();
      });
      td.appendChild(del);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  cont.appendChild(table);

  if (info) {
    info.textContent = auth ? `Ingresaste como ${auth.rol}` : 'No autenticado';
  }
}

function esc(s){
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

document.addEventListener('DOMContentLoaded', () => {
  const btnOut = document.getElementById('btn-logout');
  if (btnOut) btnOut.addEventListener('click', () => { logout(); location.href = '../LoginCliente.html'; });
  // Protección básica: si no hay auth, regresar al login cliente
  const auth = getAuth();
  if (!auth) {
    location.href = '../LoginCliente.html';
    return;
  }
  render();
});
