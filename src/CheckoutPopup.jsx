import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPopup = ({ userAddress, deliveryCost = 1500 }) => {
  const [showModal, setShowModal] = useState(false);
  const [method, setMethod] = useState('pickup');
  const navigate = useNavigate();

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 1);
  const formattedDate = estimatedDate.toLocaleDateString('es-AR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const deliveryInfo = {
      method,
      cost: method === 'delivery' ? deliveryCost : 0
    };
    navigate('/checkout/payment', { state: deliveryInfo });
  };

  return (
    <>
      {/* Botón para abrir el popup */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
      >
        Elegir método de entrega
      </button>

      {/* Fondo oscuro y modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg animate-fade-in-up relative">
            {/* Botón de cierre */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>

            {/* Contenido del modal */}
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-6 text-center">¿Cómo querés recibir tu compra?</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Retiro */}
                <div
                  onClick={() => setMethod('pickup')}
                  className={`cursor-pointer border-2 rounded-lg p-6 transition-all ${
                    method === 'pickup'
                      ? 'border-black shadow-lg bg-gray-100'
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-1">Retiro en showroom</h3>
                  <p className="text-sm text-gray-600">
                    Lunes a Viernes de 9 a 18hs - Av. Siempreviva 1234
                  </p>
                </div>

                {/* Envío */}
                <div
                  onClick={() => setMethod('delivery')}
                  className={`cursor-pointer border-2 rounded-lg p-6 transition-all ${
                    method === 'delivery'
                      ? 'border-black shadow-lg bg-gray-100'
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-1">Envío a domicilio</h3>
                  <p className="text-sm text-gray-600">{deliveryCost} ARS</p>
                </div>
              </div>

              {method === 'delivery' && (
                <div className="mb-6 border p-4 rounded bg-blue-50 border-blue-300">
                  <p><strong>Dirección de entrega:</strong> {userAddress}</p>
                  <p><strong>Entrega estimada:</strong> {formattedDate} entre 9 y 18hs</p>
                  <p><strong>Costo adicional:</strong> {deliveryCost} ARS</p>
                </div>
              )}

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2 rounded border border-gray-400 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-black text-white py-2 px-6 rounded hover:bg-gray-800"
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPopup;
