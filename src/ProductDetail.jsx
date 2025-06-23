"use client"

import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ToastNotification from './ToastNotification'; // ajustá la ruta
export function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("Negro")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [toastMessage, setToastMessage] = useState('');
  // Fetch del producto desde la API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        // Usando tu ruta: /products/detail/:id
        const response = await fetch(`http://localhost:3000/products/detail/${id}`)

        if (!response.ok) {
          throw new Error("Producto no encontrado")
        }

        const apiResponse = await response.json()
        console.log("Respuesta completa de la API:", apiResponse) // Para debug

        // Verificar que la respuesta sea exitosa y tenga datos
        if (!apiResponse.success || !apiResponse.data) {
          throw new Error(apiResponse.message || "Error al obtener el producto")
        }

        const productData = apiResponse.data
        console.log("Datos del producto:", productData) // Para debug

        // Mapear los datos de la API al formato que necesita el frontend
        const mappedProduct = {
          id: productData.id,
          name: productData.nombre,
          brand: productData.brand,
          price: productData.unityPrice,
          // Como no hay promoción en este ejemplo, usar valores por defecto
          originalPrice: productData.unityPrice, // Mismo precio si no hay promoción
          discount: 0, // Sin descuento por defecto
          // Valores por defecto para campos que no están en la API
          condition: "Nuevo",
          img: productData.img,
          colors: ["Negro", "Blanco", "Azul", "Rojo"],
          deliveryPrice: 5990,
          stock: 15,
          warranty: "1 año",
          description: `${productData.nombre} de la marca ${productData.brand}. Producto de alta calidad.`,
          category: "Sin categoría", // Por defecto ya que no viene en la respuesta
          categoryId: productData.id_category,
          promotion: null, // null por defecto
        }

        setProduct(mappedProduct)
        setSelectedColor(mappedProduct.colors[0])
      } catch (err) {
        console.error("Error fetching product:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  // Productos relacionados (usando la ruta general de productos)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        if (product && product.categoryId) {
          const response = await fetch(`http://localhost:3000/products/`)

          if (response.ok) {
            const apiResponse = await response.json()
            console.log("Respuesta de productos relacionados:", apiResponse) // Para debug

            // Verificar si la respuesta tiene la estructura esperada
            let allProducts = []
            if (apiResponse.success && apiResponse.data) {
              allProducts = apiResponse.data
            } else if (Array.isArray(apiResponse)) {
              allProducts = apiResponse
            } else {
              console.warn("Estructura de respuesta inesperada para productos:", apiResponse)
              return
            }

            // Filtrar productos de la misma categoría, excluyendo el actual
            const relatedData = allProducts
              .filter((item) => item.id_category === product.categoryId && item.id !== Number.parseInt(id))
              .slice(0, 4)

            const mappedRelated = relatedData.map((item) => ({
              id: item.id,
              name: item.nombre,
              price: item.unityPrice,
              img: item.img,
            }))

            setRelatedProducts(mappedRelated)
          }
        }
      } catch (err) {
        console.error("Error fetching related products:", err)
        // Si falla, usar productos por defecto
        setRelatedProducts(
          Array.from({ length: 4 }, (_, i) => ({
            id: i + 10,
            name: `Producto Relacionado ${i + 1}`,
            price: (Math.random() * 50 + 20).toFixed(0),
            img: `/placeholder.svg?height=150&width=150`,
          })),
        )
      }
    }

    if (product) {
      fetchRelatedProducts()
    }
  }, [product, id])

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.img.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.img.length) % product.img.length)
  }

  // Estados de carga y error
  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="error-container">
          <h2>Error al cargar el producto</h2>
          <p>{error}</p>
          <Link to="/products" className="back-link">
            ← Volver a productos
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error-container">
          <h2>Producto no encontrado</h2>
          <Link to="/products" className="back-link">
            ← Volver a productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> / <Link to="/products">Productos</Link> /
        {product.category && product.category !== "Sin categoría" && (
          <>
            {" "}
            / <span>{product.category}</span>
          </>
        )}{" "}
        / {product.name}
      </div>

      <div className="product-detail-layout">
        {/* Columna 1: Imagen y productos relacionados */}
        <div className="product-images-column">
          {/* Imagen principal */}
          <div className="main-image-container">
            <button className="image-nav-btn prev" onClick={prevImage}>
              ‹
            </button>
            <img
              src={product.img || "/placeholder.svg"}
              alt={product.name}
              className="main-product-image"
            />
            <button className="image-nav-btn next" onClick={nextImage}>
              ›
            </button>
          </div>

          {/* Thumbnails */}
         <div className="image-thumbnails">
  <img
    src={product.img || "/placeholder.svg"}
    alt={`${product.name}`}
    className="thumbnail active"
    onClick={() => setCurrentImageIndex(0)}
  />
</div>

          {/* Productos relacionados */}
          <div className="related-products">
            <h3>Productos relacionados</h3>
            <div className="related-products-grid">
              {relatedProducts.length > 0 ? (
                relatedProducts.map((relatedProduct) => (
                  <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="related-product-card">
                    <img src={relatedProduct.image || "/placeholder.svg"} alt={relatedProduct.name} />
                    <div className="related-product-info">
                      <p className="related-product-name">{relatedProduct.name}</p>
                      <p className="related-product-price">${relatedProduct.price?.toLocaleString() || "0"}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No hay productos relacionados disponibles</p>
              )}
            </div>
          </div>
        </div>

        {/* Columna 2: Detalles del producto */}
        <div className="product-details-column">
          <div className="product-header">
            <span className="product-condition">{product.condition}</span>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-brand">Marca: {product.brand}</p>
            {product.category && product.category !== "Sin categoría" && (
              <p className="product-category">Categoría: {product.category}</p>
            )}
          </div>

          <div className="product-pricing">
            <div className="price-container">
              <span className="current-price">${product.price?.toLocaleString() || "0"}</span>
              {product.discount > 0 && (
                <>
                  <span className="original-price">${product.originalPrice?.toLocaleString() || "0"}</span>
                  <span className="discount-badge">{product.discount}% OFF</span>
                </>
              )}
            </div>
            {product.promotion && (
              <div className="promotion-info">
                <p>🎉 Promoción activa: {product.promotion.name || `${product.discount}% de descuento`}</p>
              </div>
            )}
          </div>

          {/* Color */}
          <div className="product-option">
            <label>Color:</label>
            <div className="color-options">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`color-btn ${selectedColor === color ? "selected" : ""}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Cantidad */}
          <div className="product-option">
            <label>Cantidad:</label>
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                −
              </button>
              <span className="quantity-display">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}>
                +
              </button>
            </div>
            <span className="stock-info">({product.stock} disponibles)</span>
          </div>

          {/* Delivery */}
          <div className="delivery-info">
            <span className="icon">🚚</span>
            <div>
              <p className="delivery-title">Envío</p>
              <p className="delivery-price">${product.deliveryPrice?.toLocaleString() || "0"}</p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="action-buttons">
            <button className="btn-add-cart" onClick={() => handleAddToCart()}>
              <span className="icon">🛒</span>
              Agregar al carrito
            </button>
            {toastMessage && (
        <ToastNotification
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}
            <button className="btn-buy-now" onClick={() => handleBuyNow()}>
              
              <span className="icon">💳</span>
              Comprar ahora
            </button>
          </div>

          {/* Medios de pago */}
          <div className="payment-methods">
            <h4>Ver los medios de pago</h4>
            <div className="payment-options">
              <p>💳 Tarjetas de crédito y débito</p>
              <p>🏦 Transferencia bancaria</p>
              <p>💰 Efectivo en puntos de pago</p>
            </div>
          </div>

          {/* Garantía */}
          <div className="warranty-info">
            <span className="icon">🛡️</span>
            <div>
              <p className="warranty-title">Garantía</p>
              <p className="warranty-text">{product.warranty}</p>
            </div>
          </div>

          {/* Descripción */}
          <div className="product-description">
            <h4>Descripción</h4>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )

  // Funciones para manejar acciones
  function handleAddToCart() {
    console.log("Agregando al carrito:", {
      productId: product.id,
      quantity: quantity,
      color: selectedColor,
      price: product.price,
    })
    setToastMessage(`Agregado al carrito: ${quantity} x ${product.name}`);
  }

  function handleBuyNow() {
    console.log("Comprando ahora:", {
      productId: product.id,
      quantity: quantity,
      color: selectedColor,
      total: product.price * quantity,
    })
    alert(`Comprando: ${quantity} x ${product.name} - Total: $${(product.price * quantity).toLocaleString()}`)
  }
}
