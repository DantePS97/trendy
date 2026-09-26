const { Router } = require("express");
const productoController = require("../controllers/producto.controller");

const router = Router();

// RF-008 a RF-011: catálogo público, sin auth ni roleGuard.
// GET /api/v1/productos?categoria=&talla=&precioMin=&precioMax=&q=
router.get("/api/v1/productos", productoController.listar);

// RF-012: detalle de producto (MOD-02), público. No colisiona con la ruta
// de arriba: Express matchea por cantidad de segmentos, así que el orden
// entre estas dos no importa (no hay otro path fijo tipo /productos/algo
// que pudiera ser tapado por el :id).
router.get("/api/v1/productos/:id", productoController.getById);

module.exports = router;
