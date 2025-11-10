// Control de autenticación simple por rol usando localStorage
// Roles: Cliente, Personal

const AUTH_KEY = 'hotel_auth';

export function loginComo(rol, id = "anon", nombre = "") {
  const data = { rol, id, nombre, time: Date.now() };
  localStorage.setItem(AUTH_KEY, JSON.stringify(data));
  return data;
}

export function getAuth() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null'); } catch(e){ return null; }
}

export function logout() { localStorage.removeItem(AUTH_KEY); }

export function requireRol(roles=[]) {
  const auth = getAuth();
  if(!auth || (roles.length && !roles.includes(auth.rol))) {
    return false;
  }
  return true;
}

export function initAuthBadge() {
  const auth = getAuth();
  const badge = document.getElementById('auth-badge');
  if (!badge) return;
  if (!auth) {
    badge.textContent = 'No autenticado';
    badge.className = 'auth-badge unauth';
  } else {
    const label = auth.nombre ? `${auth.nombre} (${auth.rol})` : `${auth.rol} #${auth.id}`;
    badge.textContent = label;
    badge.className = 'auth-badge ' + auth.rol.toLowerCase();
  }
}

document.addEventListener('DOMContentLoaded', initAuthBadge);
