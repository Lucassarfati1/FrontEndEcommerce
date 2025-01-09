import React from "react";

export function Footer() {
  return (
    <div className="footer">
      {/* Columna de Redes Sociales */}
      <div className="footer-column">
        <h4>Redes Sociales</h4>
        <ul>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">X (Twitter)</a></li>
        </ul>
      </div>

      {/* Columna de Contacto */}
      <div className="footer-column">
        <h4>Contacto</h4>
        <ul>
          <li>Email: contacto@misitioweb.com</li>
        </ul>
      </div>

      {/* Derechos Reservados */}
      <div className="footer-rights">
        © 2025 Mi Sitio Web. Todos los derechos reservados.
      </div>
    </div>
  );
}
