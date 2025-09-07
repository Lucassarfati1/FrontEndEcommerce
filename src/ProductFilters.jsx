"use client"

import { useState, useEffect } from "react"

export function ProductFilters({ onSearch, loading, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    search: initialFilters.search || "",
    category: initialFilters.category || "",
    minPrice: initialFilters.minPrice || "",
    maxPrice: initialFilters.maxPrice || "",
    condition: initialFilters.condition || "",
    sortBy: initialFilters.sortBy || "name",
    sortOrder: initialFilters.sortOrder || "asc",
  })

  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState(null)

  // Actualizar filtros cuando cambien los initialFilters (desde URL)
  useEffect(() => {
    setFilters({
      search: initialFilters.search || "",
      category: initialFilters.category || "",
      minPrice: initialFilters.minPrice || "",
      maxPrice: initialFilters.maxPrice || "",
      condition: initialFilters.condition || "",
      sortBy: initialFilters.sortBy || "name",
      sortOrder: initialFilters.sortOrder || "asc",
    })
  }, [initialFilters])

  // Cargar categorías al montar el componente
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true)
      setCategoriesError(null)

      const response = await fetch("http://localhost:3000/products/categories")

      if (!response.ok) {
        throw new Error("Error al cargar categorías")
      }

      const apiResponse = await response.json()
      console.log("Respuesta de categorías:", apiResponse)

      let categoriesData = []

      if (apiResponse.success && apiResponse.data) {
        categoriesData = apiResponse.data
      } else if (Array.isArray(apiResponse)) {
        categoriesData = apiResponse
      } else {
        throw new Error("Estructura de respuesta inesperada")
      }

      setCategories(categoriesData)
    } catch (error) {
      console.error("Error fetching categories:", error)
      setCategoriesError(error.message)

      // Categorías por defecto si falla la API
      setCategories([
        { id: 1, name: "Remeras" },
        { id: 2, name: "Camisetas" },
        { id: 3, name: "Shorts" },
        { id: 4, name: "Pantalones" },
        { id: 5, name: "Camperas" },
        { id: 6, name: "Buzos" },
        { id: 7, name: "Conjuntos" },
        { id: 8, name: "Zapatillas" },
      ])
    } finally {
      setCategoriesLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    const newFilters = { ...filters, [field]: value }
    setFilters(newFilters)
  }

  const handleSearch = () => {
    const queryParams = new URLSearchParams()

    if (filters.search.trim()) queryParams.append("search", filters.search.trim())
    if (filters.category) queryParams.append("category", filters.category)
    if (filters.minPrice) queryParams.append("minPrice", filters.minPrice)
    if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice)
    if (filters.condition) queryParams.append("condition", filters.condition)
    if (filters.sortBy) queryParams.append("sortBy", filters.sortBy)
    if (filters.sortOrder) queryParams.append("sortOrder", filters.sortOrder)

    // Actualizar la URL también
    const newUrl = `/products?${queryParams.toString()}`
    window.history.pushState({}, "", newUrl)

    onSearch(queryParams.toString())
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      condition: "",
      sortBy: "name",
      sortOrder: "asc",
    }
    setFilters(clearedFilters)

    // Limpiar URL también
    window.history.pushState({}, "", "/products")

    onSearch("")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="product-filters-sidebar">
      <div className="filters-header">
        <h4>Filtros</h4>
        <button className="clear-btn" onClick={handleClearFilters} disabled={loading}>
          Limpiar
        </button>
      </div>

      <div className="filters-content">
        {/* Búsqueda */}
        <div className="filter-item">
          <label>Buscar</label>
          <div className="search-box">
            <input
              type="text"
              placeholder="Producto..."
              value={filters.search}
              onChange={(e) => handleInputChange("search", e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Categoría */}
        <div className="filter-item">
          <label>Categoría</label>
          {categoriesLoading ? (
            <select disabled>
              <option>Cargando categorías...</option>
            </select>
          ) : categoriesError ? (
            <select disabled>
              <option>Error al cargar categorías</option>
            </select>
          ) : (
            <select value={filters.category} onChange={(e) => handleInputChange("category", e.target.value)}>
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
          {categoriesError && (
            <small className="error-text">
              Error: {categoriesError}
              <button className="retry-btn" onClick={fetchCategories} disabled={categoriesLoading}>
                Reintentar
              </button>
            </small>
          )}
        </div>

        {/* Precio */}
        <div className="filter-item">
          <label>Precio</label>
          <div className="price-range">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleInputChange("minPrice", e.target.value)}
                className="max-w-[80px] w-full appearance-none"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleInputChange("maxPrice", e.target.value)}
                className="max-w-[80px] w-full appearance-none"
            />
          </div>
        </div>

        {/* Estado */}
        <div className="filter-item">
          <label>Estado</label>
          <select value={filters.condition} onChange={(e) => handleInputChange("condition", e.target.value)}>
            <option value="">Todos</option>
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
            <option value="reacondicionado">Reacondicionado</option>
          </select>
        </div>

        {/* Ordenar */}
        <div className="filter-item">
          <label>Ordenar por</label>
          <select value={filters.sortBy} onChange={(e) => handleInputChange("sortBy", e.target.value)}>
            <option value="name">Nombre</option>
            <option value="price">Precio</option>
            <option value="brand">Marca</option>
          </select>
          <select
            value={filters.sortOrder}
            onChange={(e) => handleInputChange("sortOrder", e.target.value)}
            className="sort-order"
          >
            <option value="asc">↑ A-Z</option>
            <option value="desc">↓ Z-A</option>
          </select>
        </div>

        {/* Botón buscar */}
        <button className="search-btn" onClick={handleSearch} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>

        {/* Filtros activos */}
        {(filters.search || filters.category || filters.minPrice || filters.maxPrice || filters.condition) && (
          <div className="active-filters">
            <small>Filtros activos:</small>
            {filters.search && <span className="tag">"{filters.search}"</span>}
            {filters.category && (
              <span className="tag">
                {categories.find((c) => c.id == filters.category)?.name || `Categoría ${filters.category}`}
              </span>
            )}
            {filters.minPrice && <span className="tag">${filters.minPrice}+</span>}
            {filters.maxPrice && <span className="tag">-${filters.maxPrice}</span>}
            {filters.condition && <span className="tag">{filters.condition}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

