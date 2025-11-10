import { Usuario } from "./Usuario.js";

export class Administrador extends Usuario {
  constructor(idUsuario, nombre, contraseña) {
    super(idUsuario, nombre, contraseña, "Administrador");
  }
}
