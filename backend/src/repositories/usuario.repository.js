const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

// Prisma 7 requiere un driver adapter explícito: ya no arma la conexión
// automáticamente a partir de datasource.url en schema.prisma (ver
// https://pris.ly/d/prisma7-client-config). Usamos @prisma/adapter-mariadb
// porque no existe un @prisma/adapter-mysql dedicado; el driver "mariadb"
// es wire-compatible con MySQL y es el adapter oficial de Prisma para
// datasource provider = "mysql".
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

async function crear({ nombre, correo, passwordHash, rolId }) {
  return prisma.usuario.create({
    data: { nombre, correo, passwordHash, rolId },
  });
}

module.exports = {
  prisma,
  crear,
};
