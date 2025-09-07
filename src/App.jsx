"use client"
import './tailwind.css';
import "./App.css"
import { useState, useEffect } from "react"
import { Promo } from "./Promo"
import { Nav } from "./Nav"
import { HomePage } from "./HomePage"
import { Footer } from "./Footer"
import { ProductPage } from "./ProductPage"
import { ProductDetail } from "./ProductDetail"
import { Cart } from "./Cart"
import { AuthNotification } from "./AuthNotification"
import { AuthModal } from "./AuthModal"
import { Route, Routes } from "react-router-dom"
//import CheckoutForm from "./CheckoutForm"
import { Order } from './Order';
import { PurchaseSuccess } from './PurchaseSuccess';
import { OrdersTable } from './OrdersTable';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [cartItems, setCartItems] = useState([])

  // Verificar si hay usuario loggeado al cargar la app
    useEffect(() => {
      const token = localStorage.getItem("authToken")
      const userData = localStorage.getItem("userData")
      const savedCart = localStorage.getItem("cartItems")

      if (token && userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error("Error parsing user data:", error)
          localStorage.removeItem("authToken")
          localStorage.removeItem("userData")
        }
    }

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error parsing cart data:", error)
        localStorage.removeItem("cartItems")
      }
    }
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true)
  }

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  const handleAuthSuccess = (userData) => {
    setUser(userData)
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    setUser(null)
  }

  // Funciones del carrito
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // Si el producto ya existe, aumentar cantidad
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // Si es nuevo, agregarlo con cantidad 1
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  return (
    <div className="app-container">
      <Promo />
      <Nav user={user} onOpenAuth={handleOpenAuthModal} onLogout={handleLogout} cartItemsCount={cartItems.length} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage onAddToCart={handleAddToCart} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          <Route path="/order" element={<Order />} />
           <Route path="/PurchaseSuccess" element={<PurchaseSuccess />} />
           <Route path="/favoritos" element={<OrdersTable />} />
          <Route
            path="/carrito"
            element={
              <Cart
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
              />
            }
          />
        </Routes>
      </main>

      <Footer />

      {/* Notificación de autenticación */}
      <AuthNotification onOpenModal={handleOpenAuthModal} />

      {/* Modal de autenticación */}
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} onAuthSuccess={handleAuthSuccess} />
    </div>
  )
}

export default App
