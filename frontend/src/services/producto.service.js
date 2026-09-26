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

// Detalle de producto público (RF-012). El backend devuelve 404 cuando el
// producto no existe o no está activo; se propaga tal cual para que la
// página de detalle distinga ese caso de un error genérico de red.
function obtenerProducto(id) {
  return api.get(`/productos/${id}`).then((response) => response.data);
}

const productoService = {
  listarProductos,
  listarCategorias,
  obtenerProducto,
};

export default productoService;
