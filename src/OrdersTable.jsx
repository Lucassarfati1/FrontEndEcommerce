// src/components/OrdersTable.jsx
import React, { useEffect, useState } from 'react';
import OrderRow from './OrderRow';

export function OrdersTable(){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/order/history')
      .then(res => res.json())
      .then(data => {
        if (data.success) setOrders(data.data);
        else console.error('Error al traer órdenes');
      })
      .catch(err => console.error('Error de red:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando órdenes...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Órdenes del sistema</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Usuario</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Descuento</th>
            <th className="p-2 border">ID Pago</th>
            <th className="p-2 border">ID Envío</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <OrderRow key={order.id} order={order} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
