"use client"

import { useState } from "react"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"

export function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [activeTab, setActiveTab] = useState("login") // 'login' o 'register'

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="auth-modal-overlay" onClick={handleOverlayClick}>
      <div className="auth-modal">
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>

        {/* Tabs */}
        <div className="auth-tabs">
          <button className={`tab-btn ${activeTab === "login" ? "active" : ""}`} onClick={() => setActiveTab("login")}>
            Iniciar Sesión
          </button>
          <button
            className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Registrarse
          </button>
        </div>

        {/* Content */}
        <div className="auth-content">
          {activeTab === "login" ? (
            <LoginForm onSuccess={onAuthSuccess} onSwitchToRegister={() => setActiveTab("register")} />
          ) : (
            <RegisterForm onSuccess={onAuthSuccess} onSwitchToLogin={() => setActiveTab("login")} />
          )}
        </div>
      </div>
    </div>
  )
}
