"use client"

import { useState } from "react"

export function RegisterForm({ onSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    age: "",
    genre: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Validaciones del frontend
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setLoading(false)
      return
    }

    if (formData.age < 13) {
      setError("Debes tener al menos 13 años para registrarte")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        // Guardar token y datos del usuario
        localStorage.setItem("authToken", data.data.token)
        localStorage.setItem("userData", JSON.stringify(data.data.user))

        onSuccess(data.data.user)
      } else {
        setError(data.message || "Error al registrarse")
      }
    } catch (error) {
      console.error("Error:", error)
      setError("Error de conexión. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = () => {
    // Implementar registro con Google
    console.log("Registro con Google")
    alert("Función de Google en desarrollo")
  }

  const handleFacebookRegister = () => {
    // Implementar registro con Facebook
    console.log("Registro con Facebook")
    alert("Función de Facebook en desarrollo")
  }

  return (
    <div className="auth-form">
      <h2>Crear Cuenta</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Tu apellido"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">Edad</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="13"
              max="120"
              placeholder="Tu edad"
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Género</label>
            <select id="genre" name="genre" value={formData.genre} onChange={handleChange} required>
              <option value="">Seleccionar</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
              <option value="prefiero_no_decir">Prefiero no decir</option>
            </select>
          </div>
        </div>

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
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Repetir Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirma tu contraseña"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Creando cuenta..." : "Crear Cuenta"}
        </button>
      </form>

      <div className="divider">
        <span>o regístrate con</span>
      </div>

      <div className="social-buttons">
        <button className="social-btn google-btn" onClick={handleGoogleRegister}>
          <span className="social-icon">🔍</span>
          Google
        </button>
        <button className="social-btn facebook-btn" onClick={handleFacebookRegister}>
          <span className="social-icon">📘</span>
          Facebook
        </button>
      </div>

      <div className="switch-form">
        <p>
          ¿Ya tienes cuenta?{" "}
          <button type="button" className="link-btn" onClick={onSwitchToLogin}>
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  )
}
