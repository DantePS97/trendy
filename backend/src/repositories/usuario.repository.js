const prisma = require("../config/prisma");

async function crear({ nombre, correo, passwordHash, rolId }) {
  return prisma.usuario.create({
    data: { nombre, correo, passwordHash, rolId },
  });
}

async function buscarPorCorreo(correo) {
  return prisma.usuario.findUnique({
    where: { correo },
    include: { rol: true },
  });
}

async function buscarPorId(id) {
  return prisma.usuario.findUnique({
    where: { id },
    include: { rol: true },
  });
}

async function actualizarPassword(id, passwordHash) {
  return prisma.usuario.update({
    where: { id },
    data: { passwordHash },
  });
}

module.exports = {
  crear,
  buscarPorCorreo,
  buscarPorId,
  actualizarPassword,
};
