"use client"

import {  Link } from "react-router-dom"
import { useState } from 'react'


export function Nav({ user, onOpenAuth, onLogout, cartItemsCount = 0 }) {

  const [desplegado,setDesplegado] = useState(false);

function handleMenu(){
  setDesplegado(!desplegado);
}

  return (
    <div className="nav">
      <div className="nav-logo">
        <Link to="/">
          <img src="/logotipo.svg" alt="Logo" className="logo-image" />
        </Link>
      </div>
      <div className="sections">
        <ul className="list">
          <li className="option">
            Ropa
            <ul className="submenu">
              <Link to="/products?category=1">
                <li>Remeras</li>
              </Link>
              <Link to="/products?category=2">
                <li>Camisetas</li>
              </Link>
              <Link to="/products?category=4">
                <li>Pantalones</li>
              </Link>
              <Link to="/products?category=6">
                <li>Buzos</li>
              </Link>
              <Link to="/products?category=5">
                <li>Camperas</li>
              </Link>
              <Link to="/products?category=3">
                <li>Shorts</li>
              </Link>
              <Link to="/products?category=7">
                <li>Conjuntos</li>
              </Link>
            </ul>
          </li>
          <li className="option">
            Calzado
            <ul className="submenu">
              <Link to="/products?category=8">
                <li>Todas las Zapatillas</li>
              </Link>
              <Link to="/products?category=8">
                <li>Zapatillas</li>
              </Link>
              <Link to="/products?category=12">
                <li>Zapatos</li>
              </Link>
              <Link to="/products?category=11">
                <li>Botines</li>
              </Link>
            </ul>
          </li>
          <li className="option">
            Accesorios
            <ul className="submenu">
              <Link to="/products?category=9">
                <li>Relojes</li>
              </Link>
              <Link to="/products?category=10">
                <li>Gorras</li>
              </Link>
              
              
            </ul>
          </li>
        </ul>
      </div>
      <ul className="nav-icons">
        <li>
          <Link to="/carrito" className="cart-link">
            🛒{cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
          </Link>
        </li>
        <li>
          <Link to="/favoritos">
            <i className="bi bi-balloon-heart-fill"></i>
          </Link>
        </li>
        <li>
          <Link to="/products">
            <i className="bi bi-search"></i>
          </Link>
        </li>
        {/* Mostrar usuario o botón de login */}
        <li>
          {user ? (
            <div className="user-menu">
              <span className="user-name">Hola, {user.name}</span>
              <button onClick={onLogout} className="logout-btn">
                Salir
              </button>
            </div>
            
          ) : (
            <button onClick={onOpenAuth} className="auth-btn">
              👤
            </button>
          )}
        </li>
    <li className="relative">
  <div className="menuB">
    <button
      className="cursor-pointer p-2 hover:bg-gray-100 rounded transition"
      onClick={handleMenu}
    >
      <img
        src="./../menub.png"
        className="w-6 h-6 object-contain inline-block align-middle"
        alt="menu"
      />
    </button>
  </div>

  {desplegado && (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
  <a href="/perfil" className="block px-3 py-2 text-xs !text-black hover:bg-gray-100">
    Perfil
  </a>
  <a href="/ajustes" className="block px-3 py-2 text-xs !text-black hover:bg-gray-100">
    Ajustes
  </a>
  <a href="/salir" className="block px-3 py-2 text-xs !text-black hover:bg-gray-100">
    Salir
  </a>
</div>

  )}
</li>

      </ul>
    </div>
  )
}
