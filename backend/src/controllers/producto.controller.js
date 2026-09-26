const productoService = require("../services/producto.service");

// Valida que un query param opcional, si vino, sea un número — evita que un
// valor no numérico llegue como NaN hasta el `gte`/`lte` de Prisma en
// productoRepository.buscar (que no lo valida, confía en que el caller ya
// lo hizo).
function esNumeroValido(valor) {
  if (valor === undefined || valor === "") {
    return true;
  }

  return !Number.isNaN(Number(valor));
}

// RF-008 a RF-011: catálogo público con búsqueda y filtros combinables.
// No requiere auth ni roleGuard — cualquier visitante puede buscar
// productos.
async function listar(req, res) {
  const { categoria, talla, precioMin, precioMax, q } = req.query;

  if (!esNumeroValido(categoria) || !esNumeroValido(precioMin) || !esNumeroValido(precioMax)) {
    return res.status(400).json({
      error: "categoria, precioMin y precioMax deben ser numéricos",
    });
  }

  try {
    const productos = await productoService.buscar({
      categoria,
      talla,
      precioMin,
      precioMax,
      q,
    });
    return res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al listar los productos" });
  }
}

module.exports = {
  listar,
};
