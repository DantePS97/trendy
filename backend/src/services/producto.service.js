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

// RF-012: detalle de producto (MOD-02). Devuelve `null` cuando el producto
// no existe o no está ACTIVO (RN-001) — es una señal de dominio, no un
// error; el controller la traduce a 404. Por cada variante se calcula
// `disponible` a partir del stock (no se filtran las variantes agotadas:
// el detalle necesita poder mostrarlas como "sin stock").
async function obtenerDetallePorId(id) {
  const producto = await productoRepository.obtenerPorId(Number(id));

  if (!producto || producto.estado !== "ACTIVO") {
    return null;
  }

  return {
    ...producto,
    variantes: producto.variantes.map((variante) => ({
      ...variante,
      disponible: variante.stock > 0,
    })),
  };
}

module.exports = {
  buscar,
  obtenerDetallePorId,
};
