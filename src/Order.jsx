import { useLocation } from 'react-router'
import { useState } from 'react'
import { useEffect } from 'react'
import { Payment} from './Payment';

export function Order() {
  const location = useLocation();
  const [orderInfo, setOrderInfo] = useState(location.state);

  useEffect(() => {
    const savedOrder = localStorage.getItem("order");
    if (savedOrder) {
      setOrderInfo(JSON.parse(savedOrder));
    }
  }, []);

  if (!orderInfo || !orderInfo.items) {
    return <p className="text-center mt-10 text-gray-600">No hay productos en la orden.</p>;
  }

  const { items, address, method } = orderInfo;

  return (
    // Fondo de página completa (nuevo)
    <div className="min-h-screen w-full bg-[#cceaff]">
      {/* Contenido centrado */}
      <div className="max-w-5xl text-black mx-auto p-6">
        <h2 className="text-4xl font-bold mb-6 text-center">Resumen de tu pedido</h2>

        {/* Info del usuario */}
        <div className="bg-gradient-to-br from-[#2898ee] to-[#15297c] p-4 rounded-lg shadow mb-6 space-y-2">
          <p className="text-lg"><strong>Dirección:</strong> {address}</p>
          <p className="text-lg"><strong>Método de entrega:</strong> {method}</p>
        </div>

        {/* Productos */}
        <div className="bg-gradient-to-br from-[#2898ee] to-[#15297c] p-4 rounded-lg shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">Productos</h3>
          <ul className="space-y-4">
            {items.map(item => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-blue-100 p-4 rounded-md border"
              >
                <div className="flex items-center space-x-4">
                  {item.img && (
                    <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  )}
                  <div>
                    <h4 className="text-lg font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-700">
                      Cantidad: {item.quantity} &nbsp; | &nbsp; Precio: ${item.price}
                    </p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:text-right font-bold text-lg">
                  ${item.quantity * item.price}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Componente de pago */}
        <Payment />
      </div>
    </div>
  );
}
