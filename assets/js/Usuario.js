export class Usuario {
  constructor(idUsuario, nombre, contraseña, rol) {
    if (new.target === Usuario) {
      throw new Error("Usuario es abstracta y no puede instanciarse directamente");
    }
    this.idUsuario = idUsuario;
    this.nombre = nombre;
    this.contraseña = contraseña;
    this.rol = rol;
  }
}
