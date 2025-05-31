"use client"

import { useState, useEffect } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import Products from "./Products"
import { ProductFilters } from "./ProductFilters"

export function ProductPage({ onAddToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalResults, setTotalResults] = useState(0)

  // Para detectar parámetros de la URL
  const [searchParams] = useSearchParams()
  const location = useLocation()

  // Cargar productos iniciales y aplicar filtros de URL
  useEffect(() => {
    // Obtener parámetros de la URL
    const categoryFromUrl = searchParams.get("category")
    const searchFromUrl = searchParams.get("search")
    const minPriceFromUrl = searchParams.get("minPrice")
    const maxPriceFromUrl = searchParams.get("maxPrice")
    const conditionFromUrl = searchParams.get("condition")
    const sortByFromUrl = searchParams.get("sortBy")
    const sortOrderFromUrl = searchParams.get("sortOrder")

    // Construir query string con los parámetros de la URL
    const queryParams = new URLSearchParams()

    if (categoryFromUrl) queryParams.append("category", categoryFromUrl)
    if (searchFromUrl) queryParams.append("search", searchFromUrl)
    if (minPriceFromUrl) queryParams.append("minPrice", minPriceFromUrl)
    if (maxPriceFromUrl) queryParams.append("maxPrice", maxPriceFromUrl)
    if (conditionFromUrl) queryParams.append("condition", conditionFromUrl)
    if (sortByFromUrl) queryParams.append("sortBy", sortByFromUrl)
    if (sortOrderFromUrl) queryParams.append("sortOrder", sortOrderFromUrl)

    // Hacer la búsqueda con los filtros de la URL
    handleSearch(queryParams.toString())
  }, [location.search]) // Se ejecuta cuando cambian los parámetros de la URL

  const handleSearch = async (queryString) => {
    try {
      setLoading(true)
      setError(null)

      const url = queryString
        ? `http://localhost:3000/products/search?${queryString}`
        : `http://localhost:3000/products/`

      console.log("Searching with URL:", url)

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Error al buscar productos")
      }

      const apiResponse = await response.json()
      console.log("Search response:", apiResponse)

      let productsData = []
      let total = 0

      if (apiResponse.success && apiResponse.data) {
        productsData = Array.isArray(apiResponse.data) ? apiResponse.data : apiResponse.data.products || []
        total = apiResponse.data.total || productsData.length
      } else if (Array.isArray(apiResponse)) {
        productsData = apiResponse
        total = productsData.length
      }

      // Mapear productos
      const mappedProducts = productsData.map((product) => ({
        id: product.id,
        name: product.nombre,
        price: product.unityPrice,
        image: `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(product.nombre)}`,
        brand: product.brand,
        category: product.category?.name || "Sin categoría",
        categoryId: product.id_category,
        condition: product.condition || "Nuevo",
        promotion: product.promotion,
        discount: product.promotion?.discount || 0,
      }))

      setProducts(mappedProducts)
      setTotalResults(total)
    } catch (err) {
      console.error("Error searching products:", err)
      setError(err.message)
      setProducts([])
      setTotalResults(0)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="product-page-layout">
      {/* Sidebar con filtros */}
      <aside className="filters-sidebar">
        <ProductFilters
          onSearch={handleSearch}
          loading={loading}
          initialFilters={{
            category: searchParams.get("category") || "",
            search: searchParams.get("search") || "",
            minPrice: searchParams.get("minPrice") || "",
            maxPrice: searchParams.get("maxPrice") || "",
            condition: searchParams.get("condition") || "",
            sortBy: searchParams.get("sortBy") || "name",
            sortOrder: searchParams.get("sortOrder") || "asc",
          }}
        />
      </aside>

      {/* Contenido principal */}
      <main className="products-main">
        <div className="products-header">
          <h1>Catálogo de productos</h1>
          {totalResults > 0 && (
            <p className="results-count">
              {totalResults} producto{totalResults !== 1 ? "s" : ""} encontrado{totalResults !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="search-error">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="search-loading">
            <div className="loading-spinner"></div>
            <p>Buscando productos...</p>
          </div>
        )}

        {/* Productos */}
        {!loading && products.length > 0 && <Products products={products} onAddToCart={onAddToCart} />}

        {/* Sin resultados */}
        {!loading && !error && products.length === 0 && (
          <div className="no-results">
            <h3>No se encontraron productos</h3>
            <p>Intenta ajustar los filtros de búsqueda</p>
          </div>
        )}
      </main>
    </div>
  )
}

