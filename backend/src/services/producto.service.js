const productoRepository = require("../repositories/producto.repository");

// RF-008/RF-009/RF-010/RF-011: el grueso de la lógica (RN-001 de estado y
// stock, filtros combinables por categoría/talla/precio/búsqueda de texto)
// ya vive en productoRepository.buscar (Sprint 2, escrito por una
// compañera de equipo) — este service es la capa fina de siempre entre
// controller y repository, sin transformación adicional porque el shape
// que devuelve Prisma (producto + categoria + variantes + imagenes) ya es
// el que necesita el front del catálogo.
async function buscar(filtros) {
  return productoRepository.buscar(filtros);
}

module.exports = {
  buscar,
};
