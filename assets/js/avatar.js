import { getAuth, logout } from './Auth.js';

function initials(name, fallback){
  if (name && name.trim().length){
    const parts = name.trim().split(/\s+/);
    const ini = (parts[0][0]||'') + (parts[1]?.[0]||'');
    return ini.toUpperCase();
  }
  return (fallback||'?').toString().slice(0,2).toUpperCase();
}

function setupAvatar(){
  const auth = getAuth();
  const btn = document.getElementById('auth-avatar');
  const dd = document.getElementById('profile-dropdown');
  if (!btn) return;

  if (!auth){
    btn.hidden = true;
    if (dd) dd.hidden = true;
    return;
  }

  btn.hidden = false;
  btn.textContent = initials(auth.nombre || auth.id || auth.rol, auth.rol?.[0] || 'U');
  btn.title = auth.nombre ? `${auth.nombre} — ${auth.rol}` : `${auth.rol} #${auth.id}`;

  // Rutas relativas robustas según la ubicación actual
  const path = location.pathname.replace(/\\/g, '/');
  const inReservas = /\/reservas\//.test(path);
  const toPanel = inReservas ? 'panel.html' : 'reservas/panel.html';
  const toLogin = inReservas ? '../LoginCliente.html' : 'LoginCliente.html';

  if (dd){
    dd.innerHTML = `
      <div class="profile-summary"><strong>${auth.nombre || auth.id}</strong><br><span>${auth.rol}</span></div>
      <div class="profile-actions">
        <a id="pd-panel" class="profile-link" href="#">Panel de reservas</a>
        <button id="pd-logout" class="btn-login btn-logout-alt">Cerrar sesión</button>
      </div>
    `;
    dd.hidden = true;
    // Enlazar acciones con rutas correctas
    const panelLink = dd.querySelector('#pd-panel');
    if (panelLink){
      panelLink.addEventListener('click', (e)=>{ e.preventDefault(); location.href = toPanel; });
    }
  }

  btn.addEventListener('click', ()=>{
    if (!dd) return;
    dd.hidden = !dd.hidden;
  });

  document.addEventListener('click', (e)=>{
    if (!dd || !btn) return;
    if (e.target === btn || dd.contains(e.target)) return;
    dd.hidden = true;
  });

  document.addEventListener('DOMContentLoaded', ()=>{
    const lo = document.getElementById('pd-logout');
    if (lo) lo.addEventListener('click', ()=>{ logout(); location.href = toLogin; });
  });
}

// Init when DOM ready
document.addEventListener('DOMContentLoaded', setupAvatar);
