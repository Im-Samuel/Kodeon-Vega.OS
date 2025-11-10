import { loginComo } from './Auth.js';
import { Sesion } from './Sesion.js';

const STORAGE = 'clientes_reg';
const sesion = new Sesion();

function loadClientes(){
  try { return JSON.parse(localStorage.getItem(STORAGE)||'[]'); } catch(e){ return []; }
}

function autenticar(id, pass){
  const clientes = loadClientes();
  return clientes.find(c=>c.id===id && c.pass===pass);
}

const form = document.getElementById('login-form');
function showMsg(t, ok=false){
  const m = document.getElementById('mensaje');
  if(m){ m.textContent=t; m.style.color = ok?'green':'red'; }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = (document.getElementById('idUsuario')?.value || '').trim();
    const pass = (document.getElementById('password')?.value || '');
    if (!id || !pass) return showMsg('Completa ID y contraseña');
    // 1) Intentar como cliente registrado
    const cli = autenticar(id, pass);
    if (cli){
      loginComo('Cliente', id, cli.nombre);
      showMsg('Acceso correcto', true);
      setTimeout(()=>{ window.location.href = 'reservas/panel.html'; }, 600);
      return;
    }
    // 2) Intentar como personal (admin/recepcionista) usando Sesion.js
    const staff = sesion.login(id, pass);
    if (staff){
      // Guardamos el rol real del personal (Administrador/Recepcionista)
      loginComo(staff.rol, staff.idUsuario, staff.nombre);
      showMsg('Bienvenido ' + staff.nombre, true);
      setTimeout(()=>{ window.location.href = 'reservas/panel.html'; }, 600);
      return;
    }
    // 3) Error
    showMsg('Credenciales inválidas');
  });
});
