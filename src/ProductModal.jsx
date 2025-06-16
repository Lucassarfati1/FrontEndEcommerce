import React, { useState } from 'react';
import axios from 'axios';

export default function ProductModal({ onClose }) {
  const [form, setForm] = useState({
    nombre: '',
    brand: '',
    unityPrice: '',
    id_category: '',
    id_promotion: '',
    img: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, img: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', form.nombre);
    formData.append('brand', form.brand);
    formData.append('unityPrice', parseInt(form.unityPrice));
    formData.append('id_category', parseInt(form.id_category));
    if (form.id_promotion) {
      formData.append('id_promotion', parseInt(form.id_promotion));
    }
    if (form.img) {
      formData.append('image', form.img);
    }

    try {
      const res = await axios.post('http://localhost:3000/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        alert('Producto creado correctamente');
        onClose();
      } else {
        alert('Error al crear producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error al enviar el formulario');
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 mt-15 overscroll-none">
      <form onSubmit={handleSubmit} className="bg-slate-300 rounded-lg p-8 w-full max-w-2xl scroll-n">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Crear Producto</h2>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
            <input type="text" name="nombre" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nombre del producto" required />
          </div>
          <div>
            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Marca</label>
            <input type="text" name="brand" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Marca" required />
          </div>
          <div>
            <label htmlFor="unityPrice" className="block mb-2 text-sm font-medium text-gray-900">Precio</label>
            <input type="number" name="unityPrice" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="$0.00" required />
          </div>
          <div>
            <label htmlFor="id_category" className="block mb-2 text-sm font-medium text-gray-900">ID Categoría</label>
            <input type="number" name="id_category" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Ej: 1" required />
          </div>
          <div>
            <label htmlFor="id_promotion" className="block mb-2 text-sm font-medium text-gray-900">ID Promoción (opcional)</label>
            <input type="number" name="id_promotion" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Ej: 5" />
          </div>
          <div>
            <label htmlFor="condition" className="block mb-2 text-sm font-medium text-gray-900">Condición</label>
            <select name="condition" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option value="nuevo">Nuevo</option>
              <option value="usado">Usado</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Imagen</label>
          <input type="file" name="image" onChange={handleChange} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Crear Producto
          </button>
        </div>
      </form>
    </div>
  );
}
