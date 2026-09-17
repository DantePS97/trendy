const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const direccionRoutes = require("./routes/direccion.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "API funcionando correctamente",
  });
});

app.use(authRoutes);
app.use(direccionRoutes);

// DDS §5.3: SIEMPRE al final, después de montar todas las rutas — es el
// único middleware con firma de 4 argumentos, por eso Express lo trata
// como error handler en vez de middleware normal.
app.use(errorHandler);

module.exports = app;
