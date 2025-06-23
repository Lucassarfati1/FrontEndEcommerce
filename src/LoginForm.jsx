"use client"

import { useState } from "react"

export function LoginForm({ onSuccess, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("") // Limpiar error al escribir
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      localStorage.setItem("authToken", data.token); // Guardar token
      if (data.success) {
        // Guardar token y datos del usuario
        localStorage.setItem("authToken", data.data.token)
        localStorage.setItem("userData", JSON.stringify(data.data.user))

        onSuccess(data.data.user)
      } else {
        setError(data.message || "Error al iniciar sesión")
      }
    } catch (error) {
      console.error("Error:", error)
      setError("Error de conexión. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Implementar login con Google
    console.log("Login con Google")
    alert("Función de Google en desarrollo")
  }

  const handleFacebookLogin = () => {
    // Implementar login con Facebook
    console.log("Login con Facebook")
    alert("Función de Facebook en desarrollo")
  }

  return (
    <div className="auth-form">
      <h2>Iniciar Sesión</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Tu contraseña"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>

      <div className="divider">
        <span>o continúa con</span>
      </div>

      <div className="social-buttons">
        <button className="social-btn google-btn" onClick={handleGoogleLogin}>
          <span className="social-icon">🔍</span>
          Google
        </button>
        <button className="social-btn facebook-btn" onClick={handleFacebookLogin}>
          <span className="social-icon">📘</span>
          Facebook
        </button>
      </div>

      <div className="switch-form">
        <p>
          ¿No tienes cuenta?{" "}
          <button type="button" className="link-btn" onClick={onSwitchToRegister}>
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  )
}
