import { useEffect, useState } from "react";

export function OrderDetail() {
  
  const [order, setOrder] = useState(null);
    const id = window.location.pathname.split("/").pop();
  useEffect(() => {
    fetch(`http://localhost:3000/order/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrder(data.data);
        else console.error("Error al traer el detalle de la orden");
      })
      .catch((err) => console.error("Error de red:", err));
  }, [id]); 

  if (!order) return <p>Cargando detalle de la orden...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl text-black font-bold mb-4">Detalle de la Orden</h2>
      <p className="text-black">Aquí se mostrará el detalle de la orden seleccionada.</p>
      {/* Detalles de la orden */}
      {order && (
        <div className="bg-gray-400 p-6 rounded-lg grid-cols-1 content-center shadow-md">
          <h3 className="text-xl mt-10 bg-sky-900 w-200 text-amber-50  font-semibold">Información de la Orden</h3>
          <p className="p-4 m-4 text-white font-bold">ID: {order.id}</p>
          <p className="p-4 m-4 text-white font-bold">Usuario: {order.id_user}</p>
          <p className="p-4 m-4 text-white font-bold">Total: ${order.total}</p>
          <p className="p-4 m-4 text-white font-bold">Descuento: {order.discount}</p>
          <p className="p-4 m-4 text-white font-bold">ID Pago: {order.id_pay}</p>
          <p className="p-4 m-4 text-white font-bold">ID Envío: {order.id_delivery}</p>
        </div>
      )}
    </div>
  );
}