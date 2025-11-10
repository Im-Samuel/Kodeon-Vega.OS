import { Usuario } from "./Usuario.js";

export class Recepcionista extends Usuario {
  constructor(idUsuario, nombre, contraseña) {
    super(idUsuario, nombre, contraseña, "Recepcionista");
  }
}
