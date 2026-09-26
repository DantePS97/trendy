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

// RF-012: detalle de producto público (MOD-02). No requiere auth ni
// roleGuard, igual que `listar`.
async function getById(req, res) {
  const { id } = req.params;

  // A diferencia de esNumeroValido (que trata "" / undefined como válido
  // porque son filtros opcionales en `listar`), acá el id es obligatorio:
  // un valor no numérico no puede llegar a Prisma.
  if (Number.isNaN(Number(id))) {
    return res.status(400).json({ error: "id debe ser numérico" });
  }

  try {
    const producto = await productoService.obtenerDetallePorId(id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener el producto" });
  }
}

module.exports = {
  listar,
  getById,
};
