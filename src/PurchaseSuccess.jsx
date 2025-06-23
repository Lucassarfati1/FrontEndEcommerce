import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

export function PurchaseSuccess() {
  
  
  localStorage.removeItem("order");
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex flex-col items-center justify-center px-4 text-center">
      <FaCheckCircle className="text-green-600 text-6xl mb-4" />
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">¡Compra realizada con éxito!</h1>
      <p className="text-gray-700 text-lg mb-6">
        Gracias por tu compra. En breve recibirás un correo con los detalles de tu pedido.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 !text-white no-underline px-6 py-2 rounded-lg text-sm font-medium"

        >
          Volver al inicio
        </Link>
        <Link
          to="/orders"
            className="bg-blue-600 hover:bg-blue-700 !text-white no-underline px-6 py-2 rounded-lg text-sm font-medium"

        >
          Ver mis pedidos
        </Link>
      </div>
    </div>
  );
}
