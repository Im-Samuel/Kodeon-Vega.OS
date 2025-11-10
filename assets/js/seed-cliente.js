// Script opcional para crear un cliente de prueba si no existe.
// Se carga solo en LoginCliente.html de forma temporal para facilitar pruebas de inicio de sesión.
const KEY = 'clientes_reg';
try {
  const list = JSON.parse(localStorage.getItem(KEY) || '[]');
  if (!list.some(c=>c.id==='demo')){
    list.push({ id: 'demo', nombre: 'Cliente Demo', pass: '1234' });
    localStorage.setItem(KEY, JSON.stringify(list));
    console.log('[seed] Cliente demo creado (id: demo, pass: 1234)');
  }
} catch(e) { console.warn('No se pudo sembrar cliente demo', e); }
