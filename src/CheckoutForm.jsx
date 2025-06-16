import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ userAddress, deliveryCost = 1500 }) => {
  const [method, setMethod] = useState('pickup');
  const navigate = useNavigate();

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 1);
  const formattedDate = estimatedDate.toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const deliveryInfo = {
      method,
      cost: method === 'delivery' ? deliveryCost : 0
    };
    navigate('/order', { state: deliveryInfo });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">¿Cómo querés recibir tu compra?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Opción Retiro */}
        <div
          onClick={() => setMethod('pickup')}
          className={`cursor-pointer border-2 rounded-lg p-6 transition-all duration-300 ${
            method === 'pickup'
              ? 'border-black shadow-lg bg-gray-100'
              : 'border-gray-300 hover:border-gray-500'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="method"
              value="pickup"
              checked={method === 'pickup'}
              onChange={() => setMethod('pickup')}
              className="hidden"
            />
            <div>
              <h3 className="font-semibold text-lg mb-1">Retiro en showroom</h3>
              <p className="text-sm text-gray-600">
                Lunes a Viernes de 9 a 18hs - Av. Siempreviva 1234
              </p>
            </div>
          </div>
        </div>

        {/* Opción Envío */}
        <div
          onClick={() => setMethod('delivery')}
          className={`cursor-pointer border-2 rounded-lg p-6 transition-all duration-300 ${
            method === 'delivery'
              ? 'border-black shadow-lg bg-gray-100'
              : 'border-gray-300 hover:border-gray-500'
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="method"
              value="delivery"
              checked={method === 'delivery'}
              onChange={() => setMethod('delivery')}
              className="hidden"
            />
            <div>
              <h3 className="font-semibold text-lg mb-1">Envío a domicilio</h3>
              <p className="text-sm text-gray-600">{deliveryCost} ARS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Información de entrega si elige delivery */}
      {method === 'delivery' && (
        <div className="mb-6 border p-4 rounded bg-blue-50 border-blue-300">
          <p><strong>Dirección de entrega:</strong> {userAddress}</p>
          <p><strong>Entrega estimada:</strong> {formattedDate} entre 9 y 18hs</p>
          <p><strong>Costo adicional:</strong> {deliveryCost} ARS</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition"
      >
        Continuar con la compra
      </button>
    </form>
  );
};

export default CheckoutForm;
