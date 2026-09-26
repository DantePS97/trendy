const { Router } = require("express");
const productoController = require("../controllers/producto.controller");

const router = Router();

// RF-008 a RF-011: catálogo público, sin auth ni roleGuard.
// GET /api/v1/productos?categoria=&talla=&precioMin=&precioMax=&q=
router.get("/api/v1/productos", productoController.listar);

module.exports = router;
