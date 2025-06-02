"use client"

import { useState, useEffect } from "react"
import { Link, redirect } from "react-router-dom"
import  CheckoutForm  from './CheckoutForm';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import  CheckoutPopup  from './CheckoutPopup.jsx'
export function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {

  const [total, setTotal] = useState(0)
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);
  const userAddress = user?.address || 'Dirección no definida';
  // Calcular total cuando cambien los items del carrito
  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotal(newTotal)
  }, [cartItems])

    const handleCheckout = () => {
    setShowModal(true);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      onRemoveItem(itemId)
    } else {
      onUpdateQuantity(itemId, newQuantity)
    }
  }

  /*const handleCheckout = () => {
    alert(`Procesando compra por $${total.toLocaleString()}`)
    // Aquí iría la lógica de checkout real
    redirect('/CheckoutForm');
  }*/

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h1>Tu Carrito</h1>
        </div>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>¡Agrega algunos productos para comenzar!</p>
          <Link to="/products" className="continue-shopping-btn">
            Explorar Productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>
          Tu Carrito ({cartItems.length} producto{cartItems.length !== 1 ? "s" : ""})
        </h1>
        <button className="clear-cart-btn" onClick={onClearCart}>
          Vaciar Carrito
        </button>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.image || "/placeholder.svg?height=120&width=120"} alt={item.name} />
            </div>

            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-brand">Marca: {item.brand}</p>
              <p className="item-price">${item.price?.toLocaleString()}</p>
            </div>

            <div className="item-controls">
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>

              <div className="item-total">
                <span className="total-label">Subtotal:</span>
                <span className="total-price">${(item.price * item.quantity).toLocaleString()}</span>
              </div>

              <button className="remove-btn" onClick={() => onRemoveItem(item.id)}>
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-details">
          <div className="summary-row">
            <span>Subtotal ({cartItems.length} productos):</span>
            <span>${total.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Envío:</span>
            <span>Gratis</span>
          </div>
          <div className="summary-row total-row">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>

        <div className="cart-actions">
          <Link to="/products" className="continue-shopping-btn">
            ← Seguir Comprando
          </Link>
          <button className="checkout-btn" onClick={handleCheckout}>
            Finalizar Compra 💳
          </button>
          {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              ✖
            </button>
             
             <CheckoutPopup userAddress={userAddress} />
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  )
}
