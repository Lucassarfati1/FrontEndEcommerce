import React from 'react';

export function Categories() {
  const categories = [
    { name: "Calzado", img: "calzado.jpg" },
    { name: "Jeans", img: "jeanCeleste.jpg" },
    { name: "Shorts", img: "shortjpg.jpg" },
    { name: "Remeras", img: "remeras.jpg" },
    { name: "Camperas", img: "camperas.jpg" },
    { name: "Pantalones", img: "pantalon.jpg" },
    { name: "Deportivo", img: "deportivojpg.jpg" },
    { name: "Accesorios", img: "accesorio.jpg" },
  ];

  return (
    
    <div className="categories-container">
        
      {categories.map((category, index) => (
        <div key={index} className="category-card">
          <div className="category-card-inner">
            {/* Frontal de la tarjeta */}
            <div className="category-card-front">
              <img
                src={`${category.img}`}
                alt={category.name}
                className="category-image"
              />
            </div>
            {/* Reverso de la tarjeta */}
            <div className="category-card-back">
              <h3>{category.name}</h3>
              <p>Descubre más sobre {category.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
