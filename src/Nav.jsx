import React from 'react';

export function Nav() {
  return (
    <div className="nav">
      <div className="nav-logo">
        <img src="/logotipo.svg" alt="Logo" className="logo-image" />
      </div>
      <div className="sections">
        <ul className="list">
          <li className="option">
            Ropa
            <ul className="submenu">
              <li>Remeras</li>
              <li>Pantalones</li>
              <li>Buzos</li>
              <li>Camperas</li>
              <li>Shorts</li>
              <li>Medias</li>
            </ul>
          </li>
          <li className="option">
            Calzado
            <ul className="submenu">
              <li>Todas las Zapatillas</li>
              <li>LifeStyle</li>
              <li>Running</li>
              <li>Botines</li>
              <li>Basketball</li>
              <li>Ojotas</li>
            </ul>
          </li>
          <li className="option">
            Accesorios
            <ul className="submenu">
              <li>Relojes</li>
              <li>Gorras</li>
              <li>Bolsos y mochilas</li>
              <li>Pelotas</li>
            </ul>
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
