import React, { useState } from "react";

import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Sidebar from "../components/Sidebar/Sidebar";
import ProductCard from "../components/ProductCard/ProductCard";
import Pagination from "../components/Pagination/Pagination";
import Loading from "../components/Loading/Loading";

import "./Catalogo.css";

function Catalogo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);

  const products = [
    {
      id: 1,
      image: "/images/vestido.jpg",
      name: "Vestido casual",
      category: "Mujer",
      price: "89.900",
      oldPrice: "109.900",
      discount: "18",
    },
    {
      id: 2,
      image: "/images/camiseta.jpg",
      name: "Camiseta básica",
      category: "Hombre",
      price: "49.900",
    },
    {
      id: 3,
      image: "/images/jean.jpg",
      name: "Jean clásico",
      category: "Mujer",
      price: "99.900",
      oldPrice: "119.900",
      discount: "17",
    },
    {
      id: 4,
      image: "/images/chaqueta.jpg",
      name: "Chaqueta moderna",
      category: "Hombre",
      price: "129.900",
    },
    {
      id: 5,
      image: "/images/blusa.jpg",
      name: "Blusa elegante",
      category: "Mujer",
      price: "69.900",
    },
    {
      id: 6,
      image: "/images/zapatos.jpg",
      name: "Zapatos casuales",
      category: "Accesorios",
      price: "119.900",
    },
  ];

  const handleViewProduct = (product) => {
    console.log("Ver producto:", product.name);
  };

  const handleAddToCart = (product) => {
    console.log("Producto agregado al carrito:", product.name);
  };

  if (loading) {
    return <Loading text="Cargando productos..." />;
  }

  return (
    <main className="catalogo">
      <div className="catalogo__container">

        <Breadcrumb
          items={[
            { label: "Inicio", link: "/" },
            { label: "Catálogo" }
          ]}
        />

        <div className="catalogo__header">
          <div>
            <h1 className="catalogo__title">
              Catálogo de productos
            </h1>

            <p className="catalogo__subtitle">
              Encuentra las últimas tendencias para ti.
            </p>
          </div>

          <span className="catalogo__count">
            {products.length} productos
          </span>
        </div>

        <div className="catalogo__content">

          <Sidebar />

          <section className="catalogo__products">

            <div className="catalogo__grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  discount={product.discount}
                  onView={() => handleViewProduct(product)}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={3}
              onPageChange={setCurrentPage}
            />

          </section>

        </div>
      </div>
    </main>
  );
}

export default Catalogo;