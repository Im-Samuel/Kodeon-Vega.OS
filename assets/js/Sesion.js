export class Sesion {
  constructor() {
    this.usuarioActivo = null;
    this.usuarios = [
      { idUsuario: "admin", contraseña: "123", rol: "Administrador", nombre: "Samuel" },
      { idUsuario: "user", contraseña: "457", rol: "Recepcionista", nombre: "Violeta" },
      { idUsuario: "user", contraseña: "4764", rol: "Recepcionista", nombre: "Alejandro"}
    ];
  }

  login(idUsuario, contraseña) {
    const user = this.usuarios.find(
      u => u.idUsuario === idUsuario && u.contraseña === contraseña
    );
    if (user) {
      this.usuarioActivo = user;
      return user;
    }
    return null;
  }

  logout() {
    this.usuarioActivo = null;
  }
}

