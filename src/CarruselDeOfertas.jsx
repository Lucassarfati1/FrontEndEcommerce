import React from "react";

const productos = [
  {
    id: 1,
    nombre: "Producto 1",
    imagen: "https://via.placeholder.com/150",
    precio: "$1000",
    descuento: "10%",
  },
  {
    id: 2,
    nombre: "Producto 2",
    imagen: "https://via.placeholder.com/150",
    precio: "$1200",
    descuento: "20%",
  },
  {
    id: 3,
    nombre: "Producto 3",
    imagen: "https://via.placeholder.com/150",
    precio: "$800",
    descuento: "5%",
  },
  {
    id: 4,
    nombre: "Producto 4",
    imagen: "https://via.placeholder.com/150",
    precio: "$1500",
    descuento: "25%",
  },
  {
    id: 5,
    nombre: "Producto 5",
    imagen: "https://via.placeholder.com/150",
    precio: "$2000",
    descuento: "15%",
  },
  {
    id: 6,
    nombre: "Producto 6",
    imagen: "https://via.placeholder.com/150",
    precio: "$900",
    descuento: "12%",
  },
];

export function CarruselDeOfertas(props) {
  return (
    <div className="carrusel-container">
      <h2 className="carrusel-titulo">Ofertas Especiales</h2>
      <div className="carrusel">
        {productos.map((producto) => (
          <div className="producto" key={producto.id}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-imagen"
            />
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <div className="producto-info">
              <p className="producto-precio">{producto.precio}</p>
              <p className="producto-descuento">{producto.descuento} de descuento</p>
              <button
                className="producto-boton"
                onClick={() => window.location.href = `/detalle/${producto.id}`}
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarruselDeOfertas;
