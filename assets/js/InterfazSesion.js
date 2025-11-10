export class Interfaz {
  constructor(sesion) {
    this.sesion = sesion;

    // Referencias a elementos HTML
    this.form = document.getElementById("login-form");
    this.mensaje = document.getElementById("mensaje");
    this.perfil = document.getElementById("perfil");
    this.logoutBtn = document.getElementById("logout");
    this.btnPerfil = document.getElementById("btn-perfil");

    this.configurarEventos();
  }

  configurarEventos() {
    // Evento de login
    this.form.addEventListener("submit", e => {
      e.preventDefault();
      this.iniciarSesion();
    });

    // Evento ver perfil
    this.btnPerfil.addEventListener("click", () => {
      this.mostrarPerfil();
    });

    // Evento logout
    this.logoutBtn.addEventListener("click", () => {
      this.cerrarSesion();
    });
  }

  iniciarSesion() {
    const idUsuario = document.getElementById("idUsuario").value;
    const contraseña = document.getElementById("contraseña").value;

    const usuario = this.sesion.login(idUsuario, contraseña);

    if (usuario) {
      this.form.style.display = "none";
      this.mensaje.textContent = `Bienvenido ${usuario.rol}: ${usuario.nombre}`;
      this.mensaje.style.color = "green";

      // Guardar datos en spans
      document.getElementById("perfil-id").textContent = usuario.idUsuario;
      document.getElementById("perfil-nombre").textContent = usuario.nombre;
      document.getElementById("perfil-rol").textContent = usuario.rol;

      this.btnPerfil.style.display = "inline-block";
    } else {
      this.mensaje.textContent = "Credenciales incorrectas";
      this.mensaje.style.color = "red";
    }
  }

  mostrarPerfil() {
    this.perfil.style.display = "block";
    this.btnPerfil.style.display = "none";
  }

  cerrarSesion() {
    this.sesion.logout();

    this.perfil.style.display = "none";
    this.btnPerfil.style.display = "none";
    this.mensaje.textContent = "";
    this.form.style.display = "block";
    this.form.reset();
  }
}
