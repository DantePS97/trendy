const usuarioRepository = require("../repositories/usuario.repository");

// TODO Sprint 1: este endpoint es un placeholder de Sprint 0. El campo debe
// pasar a llamarse "password" (texto plano por HTTPS) y el hasheo con bcrypt
// debe ocurrir server-side en el repository/service — nunca confiar en un
// hash que mande el cliente. Hoy `passwordHash` se persiste tal cual llega
// en el body, sin validar ni hashear nada de este lado.
const CAMPOS_REQUERIDOS = ["nombre", "correo", "passwordHash", "rolId"];

async function crearUsuario(req, res) {
  const body = req.body ?? {};
  const { nombre, correo, passwordHash, rolId } = body;

  const camposFaltantes = CAMPOS_REQUERIDOS.filter(
    (campo) => body[campo] === undefined || body[campo] === null || body[campo] === ""
  );

  if (camposFaltantes.length > 0) {
    return res.status(400).json({
      error: `Faltan campos requeridos: ${camposFaltantes.join(", ")}`,
    });
  }

  try {
    // Sprint 0: sin capa Service — endpoint trivial (solo un INSERT con
    // validación). Reevaluar cuando Sprint 1 agregue lógica de negocio real
    // (hasheo, validación de rol, JWT).
    const usuario = await usuarioRepository.crear({
      nombre,
      correo,
      passwordHash,
      rolId,
    });

    return res.status(201).json({
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rolId: usuario.rolId,
      estado: usuario.estado,
    });
  } catch (error) {
    // P2002 = violación de constraint unique (correo ya registrado)
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Ya existe un usuario con ese correo" });
    }

    console.error(error);
    return res.status(500).json({ error: "Error al crear usuario" });
  }
}

module.exports = {
  crearUsuario,
};
