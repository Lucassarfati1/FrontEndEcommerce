import React from 'react';

export function Nav() {
  return (
  <div className="nav">
    <div className="nav-logo">
      <img src="/logotipo.svg" alt="Logo" className="logo-image" />
    </div>
    <div className="sections" > 
      <ul className="list" >
        <li className="option" >
        Ropa
        </li>
      
        <li className="option" >
        Calzado
        </li>
      
        <li className="option" >
        Accesorios
        </li>
      
        <li className="option" >
        Deportivo
        </li>

      </ul>
    </div>
    <ul className="nav-icons">
      <li>
        <a href="#"><i className="fa-solid fa-cart-shopping"></i></a>
      </li>
      <li>
        <a href="#"><i className="bi bi-balloon-heart-fill"></i></a>
      </li>
      <li>
        <a href="#"><i className="bi bi-search"></i></a>
      </li>
    </ul>
  </div>
  
  
  );
}