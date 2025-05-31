"use client"

import { useState, useEffect } from "react"

export function AuthNotification({ onOpenModal }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Verificar si el usuario ya está loggeado
    const token = localStorage.getItem("authToken")
    if (token) {
      setIsLoggedIn(true)
    } else {
      // Mostrar notificación después de 3 segundos si no está loggeado
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleLogin = () => {
    setIsVisible(false)
    onOpenModal()
  }

  if (isLoggedIn || !isVisible) {
    return null
  }

  return (
    <div className="auth-notification">
      <div className="notification-content">
        <button className="close-btn" onClick={handleClose}>
          ×
        </button>
        <div className="notification-text">
          <h4>¡Únete a nosotros!</h4>
          <p>Inicia sesión para obtener ofertas exclusivas</p>
        </div>
        <button className="login-btn" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </div>
    </div>
  )
}
