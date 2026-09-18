const express = require("express");
const cors = require("cors");

const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "API funcionando correctamente",
  });
});

app.use(usuarioRoutes);

module.exports = app;
