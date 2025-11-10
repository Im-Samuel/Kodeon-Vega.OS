import { loginComo } from './Auth.js';
import { Sesion } from './Sesion.js';

const form = document.getElementById('login-form');
const sesion = new Sesion();

function showMsg(msg, ok=false){
  const m = document.getElementById('mensaje');
  if (m) { m.textContent = msg; m.style.color = ok ? 'green' : 'red'; }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('idUsuario')?.value.trim();
    const pass = document.getElementById('contraseña')?.value;
    if(!id || !pass) return showMsg('Completa usuario y contraseña');
    const user = sesion.login(id, pass);
    if (user) {
      loginComo('Personal', user.idUsuario, user.nombre);
      showMsg('Bienvenido ' + user.nombre, true);
      setTimeout(()=>{
        location.href = 'reservas/panel.html';
      }, 600);
    } else {
      showMsg('Credenciales incorrectas');
    }
  });
});
