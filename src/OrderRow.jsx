// src/components/OrderRow.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderRow = ({ order, index }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/admin/orders/${order.id}`);
  };

  const handleChangeStatus = () => {
    // lógica para cambiar estado (ej: abrir modal o PATCH a la API)
    alert(`Cambiar estado de orden #${order.id}`);
  };

  return (
    <tr className="text-center hover:bg-gray-50">
      <td className="p-2 border">{index}</td>
      <td className="p-2 border">{order.id_user}</td>
      <td className="p-2 border">${order.total}</td>
      <td className="p-2 border">{order.discount}%</td>
      <td className="p-2 border">{order.id_pay || 'No definido'}</td>
      <td className="p-2 border">{order.id_delivery || 'No definido'}</td>
      <td className="p-2 border space-x-2">
        <button
          onClick={handleViewDetails}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Ver Detalle
        </button>
        <button
          onClick={handleChangeStatus}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Cambiar Estado
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
