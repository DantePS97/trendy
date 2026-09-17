const { Router } = require("express");
const usuarioController = require("../controllers/usuarioController");

const router = Router();

router.post("/api/usuarios", usuarioController.crearUsuario);

module.exports = router;
