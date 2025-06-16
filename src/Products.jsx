"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"


export default function Products({ products: propProducts, onAddToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showNotification, setShowNotification] = useState(false)

  // Si se pasan productos como props, usarlos; sino, cargar desde API
  useEffect(() => {
    if (propProducts) {
      setProducts(propProducts)
      setLoading(false)
    } else {
      fetchProducts()
    }
  }, [propProducts])
// Donde hacés el fetch:
useEffect(() => {
  fetch("http://localhost:3000/products/") // o donde sea que estás trayendo los datos
    .then((res) => res.json())
    .then((data) => {
      const productsArray = data.data || []; // accedemos a "data" dentro del objeto
      console.log("RESPUESTA DEL BACKEND:", data)
      const mapped = productsArray.map((product) => ({
          id: product.id,
          name: product.nombre,
          price: product.unityPrice,
          img: product.img, // ← Asegurate que este viene como string
          brand: product.brand,
          category: "Sin categoría",
          categoryId: product.id_category,
          promotion: null,
          discount: 0,
          }));
        setProducts(mapped); // <- Este setea `products`, que luego usás en el .map
        });
      }, []);


const handleAddToCart = (product) => {
  if (onAddToCart) {
    onAddToCart(product)

    // Mostrar la notificación visual
    setShowNotification(`${product.name} agregado al carrito!`)
    setTimeout(() => setShowNotification(false), 3000)
  }
}

  if (loading) {
    return (
      <div className="products-loading">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="products-error">
        <h3>Error al cargar productos</h3>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="containerProductos">
      {showNotification && (
  <div className="toast-notification">
    {showNotification}
  </div>
)}
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`}>
            <img src={product.img} alt={product.name} />
            {console.log("Imagen del producto:", product.img)}

          </Link>
          <div className="product-info">
            <h3>{product.name}</h3>
            <div className="price-info">
              <p style={{ color: "#2e5077", fontSize: "1.2rem", fontWeight: "bold" }}>
                ${product.price?.toLocaleString() || "0"}
              </p>
              {product.discount > 0 && <span className="discount-badge-small">{product.discount}% OFF</span>}
            </div>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>Marca: {product.brand}</p>
            {product.category && product.category !== "Sin categoría" && (
              <p style={{ color: "#666", fontSize: "0.8rem" }}>Categoría: {product.category}</p>
            )}

            {/* Botones de acción */}
            <div className="product-actions">
              <Link to={`/product/${product.id}`} className="product-detail-btn">
                Ver Detalle
              </Link>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                🛒 Agregar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
