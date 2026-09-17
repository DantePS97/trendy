const prisma = require("../config/prisma");

// Nombre del rol asignado por defecto a los registros de RF-001. Asume que
// existe un seed con este Rol — pendiente en Sprint 0/1 (ver reporte de la
// ronda). El registro no se bloquea por esto: si el rol no existe, Prisma
// rechaza el create del Usuario por la FK de rolId, que es el comportamiento
// correcto (no crear usuarios sin rol válido).
const ROL_CLIENTE = "cliente";

async function buscarPorNombre(nombre) {
  return prisma.rol.findUnique({ where: { nombre } });
}

module.exports = {
  ROL_CLIENTE,
  buscarPorNombre,
};
