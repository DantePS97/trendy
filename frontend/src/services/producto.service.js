import api from "./apiClient";

// Filtra los valores vacíos/undefined antes de armar los query params:
// así "?categoria=&talla=" no llega al backend cuando el usuario todavía
// no eligió un filtro (RF-008 a RF-011).
function limpiarFiltros(filtros = {}) {
  return Object.fromEntries(
    Object.entries(filtros).filter(
      ([, valor]) => valor !== undefined && valor !== null && valor !== "",
    ),
  );
}

function listarProductos(filtros = {}) {
  return api
    .get("/productos", { params: limpiarFiltros(filtros) })
    .then((response) => response.data);
}

function listarCategorias() {
  return api.get("/categorias").then((response) => response.data);
}

const productoService = {
  listarProductos,
  listarCategorias,
};

export default productoService;
