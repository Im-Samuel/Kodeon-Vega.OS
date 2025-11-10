// Registro de cliente: guarda usuarios en localStorage y evita duplicados
const STORAGE = 'clientes_reg';

function loadClientes(){
  try { return JSON.parse(localStorage.getItem(STORAGE)||'[]'); } catch(e){ return []; }
}
function saveClientes(list){ localStorage.setItem(STORAGE, JSON.stringify(list)); }

function existeId(id){ return loadClientes().some(c=>c.id===id); }

function registrar(id, nombre, pass){
  const list = loadClientes();
  list.push({id, nombre, pass});
  saveClientes(list);
}

function showMsg(text, ok=false){
  const d = document.getElementById('registro-msg');
  if (d){ d.textContent = text; d.style.color = ok? 'green':'red'; }
}

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('registro-form');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const id = document.getElementById('reg-id').value.trim();
    const nombre = document.getElementById('reg-nombre').value.trim();
    const pass = document.getElementById('reg-pass').value;
    if (!id || !nombre || !pass) return showMsg('Completa todos los campos');
    if (existeId(id)) return showMsg('Ese ID ya existe');
    registrar(id, nombre, pass);
    showMsg('Registro exitoso. Redirigiendo...', true);
    setTimeout(()=>{ window.location.href = 'LoginCliente.html'; }, 1200);
  });
});
