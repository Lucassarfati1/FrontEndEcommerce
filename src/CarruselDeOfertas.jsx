import React, { useState, useEffect } from "react";

const productos = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  nombre: `Producto ${index + 1}`,
  imagen: "https://via.placeholder.com/150",
  precio: `$${(Math.random() * 1000 + 500).toFixed(2)}`, // Precio aleatorio entre $500 y $1500
  descuento: `${(Math.random() * 50).toFixed(0)}%`, // Descuento aleatorio entre 0% y 50%
}));

export function CarruselDeOfertas() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = 5; // Mostrar 5 productos a la vez
  const totalItems = productos.length;

  const nextSlide = () =>
    setCurrentIndex((prevIndex) =>
      (prevIndex + itemsPerView) % totalItems
    );

  const prevSlide = () =>
    setCurrentIndex((prevIndex) =>
      (prevIndex - itemsPerView + totalItems) % totalItems
    );

  // Desplazamiento automático cada 5 segundos
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carrusel-container">
      <h2 className="carrusel-titulo">Ofertas Especiales</h2>
      <div className="carrusel">
        <button className="carrusel-boton prev" onClick={prevSlide}>
          &#10094;
        </button>
        <div className="carrusel-slider">
          {productos.map((producto, index) => (
            <div
              className="producto"
              key={producto.id}
              style={{
                display:
                  index >= currentIndex && index < currentIndex + itemsPerView
                    ? "block"
                    : "none",
              }}
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="producto-imagen"
              />
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <div className="producto-info">
                <p className="producto-precio">{producto.precio}</p>
                <p className="producto-descuento">
                  {producto.descuento} de descuento
                </p>
                <button
                  className="producto-boton"
                  onClick={() =>
                    (window.location.href = `/detalle/${producto.id}`)
                  }
                >
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="carrusel-boton next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
}
