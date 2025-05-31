// src/components/ProductGrid.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const ProductGrid = ({ products }) => {
  return (
    <div className="containerProductos grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="w-full max-w-xs border rounded-2xl productContainer shadow p-4 hover:shadow-md transition mx-auto">
          {/* Asegurate de tener una imagen o usa una por defecto */}
         
          <img
  src={`/images/${product.nombre.toLowerCase().replace(/ /g, '')}.jpg`}
  alt={product.nombre}
  className="w-full max-h-48 producto-imagen object-cover rounded-xl"
  onError={(e) => {
    e.target.onerror = null; // Evita bucle infinito
    e.target.src = "/default-image.jpg";
  }}
/>
          <h3 className="text-lg font-semibold mt-2">{product.nombre}</h3>
          <p className="text-gray-700">${product.unityPrice.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Marca: {product.brand}</p>
          <Link
            to={`/product/${product.id}`}
            className="block mt-2 text-blue-600 hover:underline"
          >
            Ver Detalle
          </Link>
        </div>
      ))}
    </div>
  );
};