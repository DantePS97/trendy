import React, { useState } from "react";
import "./Inventory.css";

const Inventory = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Chaqueta denim",
      sku: "CHD-001-S",
      size: "S",
      stock: 10,
      minStock: 5,
      status: "Activo",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200",
    },
    {
      id: 2,
      name: "Chaqueta denim",
      sku: "CHD-001-M",
      size: "M",
      stock: 8,
      minStock: 5,
      status: "Activo",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200",
    },
    {
      id: 3,
      name: "Jean clásico",
      sku: "JEA-002-32",
      size: "32",
      stock: 20,
      minStock: 5,
      status: "Activo",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200",
    },
    {
      id: 4,
      name: "Camiseta básica",
      sku: "CAM-003-L",
      size: "L",
      stock: 30,
      minStock: 10,
      status: "Activo",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
    },
    {
      id: 5,
      name: "Vestido rosa",
      sku: "VES-004-M",
      size: "M",
      stock: 3,
      minStock: 5,
      status: "Bajo stock",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "Todos" ||
      (filter === "Activos" && product.status === "Activo") ||
      (filter === "Bajo stock" && product.stock <= product.minStock);

    return matchesSearch && matchesFilter;
  });

  const getStockClass = (stock, minStock) => {
    if (stock <= minStock) return "low";
    return "normal";
  };

  return (
    <div className="inventory-page">

      {/* SIDEBAR */}
      <aside className="inventory-sidebar">
        <div className="inventory-logo">
          <div className="logo-circle">T</div>
          <span>Trendy</span>
        </div>

        <nav className="inventory-menu">
          <a href="/admin/dashboard">
            <span>⌂</span>
            Dashboard
          </a>

          <a href="/admin/products">
            <span>▣</span>
            Productos
          </a>

          <a href="/admin/orders">
            <span>▤</span>
            Pedidos
          </a>

          <a href="/admin/customers">
            <span>♟</span>
            Clientes
          </a>

          <a href="/admin/sellers">
            <span>♟</span>
            Vendedores
          </a>

          <a className="active" href="/admin/inventory">
            <span>▦</span>
            Inventario
          </a>

          <a href="/admin/reports">
            <span>▥</span>
            Reportes
          </a>

          <a href="/admin/shipping">
            <span>▰</span>
            Envíos
          </a>

          <a href="/admin/settings">
            <span>⚙</span>
            Configuración
          </a>
        </nav>
      </aside>

      {/* CONTENIDO */}
      <main className="inventory-main">

        {/* TOPBAR */}
        <header className="inventory-topbar">

          <div className="inventory-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Buscar..."
            />
          </div>

          <div className="inventory-user">

            <button className="top-icon">♧</button>
            <button className="top-icon notification">
              ♧
              <b></b>
            </button>

            <div className="user-info">
              <div className="user-avatar">A</div>

              <div>
                <strong>Admin</strong>
                <small>Administrador</small>
              </div>

              <span>⌄</span>
            </div>

          </div>
        </header>

        {/* CONTENIDO DE INVENTARIO */}
        <section className="inventory-content">

          <div className="inventory-title">
            <div>
              <h1>Inventario</h1>
              <p>
                Consulta y administra el inventario de productos
              </p>
            </div>

            <div className="inventory-summary">
              <div>
                <strong>{products.length}</strong>
                <span>Productos</span>
              </div>

              <div>
                <strong>
                  {products.reduce(
                    (total, product) => total + product.stock,
                    0
                  )}
                </strong>
                <span>Unidades</span>
              </div>
            </div>
          </div>

          {/* TABLA */}
          <div className="inventory-card">

            <div className="inventory-toolbar">

              <div className="table-search">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="inventory-filters">

                <button
                  className={filter === "Todos" ? "selected" : ""}
                  onClick={() => setFilter("Todos")}
                >
                  Todos
                </button>

                <button
                  className={filter === "Activos" ? "selected" : ""}
                  onClick={() => setFilter("Activos")}
                >
                  Activos
                </button>

                <button
                  className={
                    filter === "Bajo stock" ? "selected" : ""
                  }
                  onClick={() => setFilter("Bajo stock")}
                >
                  Bajo stock
                </button>

              </div>
            </div>

            <div className="inventory-table-container">

              <table className="inventory-table">

                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>SKU</th>
                    <th>Talla</th>
                    <th>Stock</th>
                    <th>Stock mín.</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>

                      <td>
                        <div className="product-info">

                          <img
                            src={product.image}
                            alt={product.name}
                          />

                          <div>
                            <strong>{product.name}</strong>
                            <small>
                              Tienda Trendy
                            </small>
                          </div>

                        </div>
                      </td>

                      <td>{product.sku}</td>

                      <td>
                        <span className="size-badge">
                          {product.size}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`stock-number ${getStockClass(
                            product.stock,
                            product.minStock
                          )}`}
                        >
                          {product.stock}
                        </span>
                      </td>

                      <td>{product.minStock}</td>

                      <td>
                        <span
                          className={`status ${
                            product.stock <= product.minStock
                              ? "warning"
                              : "active-status"
                          }`}
                        >
                          {product.stock <= product.minStock
                            ? "Bajo stock"
                            : "Activo"}
                        </span>
                      </td>

                      <td>
                        <button
                          className="view-button"
                          onClick={() =>
                            setSelectedProduct(product)
                          }
                        >
                          Ver
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

              {filteredProducts.length === 0 && (
                <div className="empty-inventory">
                  <span>⌕</span>
                  <h3>No se encontraron productos</h3>
                  <p>
                    Intenta realizar otra búsqueda.
                  </p>
                </div>
              )}

            </div>

          </div>

        </section>

      </main>

      {/* MODAL / DETALLE DE INVENTARIO */}
      {selectedProduct && (
        <div
          className="inventory-modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >

          <div
            className="inventory-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-modal"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>

            <div className="modal-header">
              <div>
                <h2>Detalle de inventario</h2>
                <p>Información actual del producto</p>
              </div>
            </div>

            <div className="modal-product">

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />

              <div>
                <h3>{selectedProduct.name}</h3>
                <span>{selectedProduct.sku}</span>
              </div>

            </div>

            <div className="product-details">

              <div>
                <span>SKU</span>
                <strong>{selectedProduct.sku}</strong>
              </div>

              <div>
                <span>Talla</span>
                <strong>{selectedProduct.size}</strong>
              </div>

              <div>
                <span>Stock actual</span>
                <strong>{selectedProduct.stock}</strong>
              </div>

              <div>
                <span>Stock mínimo</span>
                <strong>{selectedProduct.minStock}</strong>
              </div>

              <div>
                <span>Estado</span>
                <strong>
                  {selectedProduct.stock <=
                  selectedProduct.minStock
                    ? "Bajo stock"
                    : "Activo"}
                </strong>
              </div>

              <div>
                <span>Ubicación</span>
                <strong>Bodega principal</strong>
              </div>

              <div>
                <span>Última actualización</span>
                <strong>12/06/2026</strong>
              </div>

            </div>

            <button className="update-stock">
              Actualizar stock
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Inventory;