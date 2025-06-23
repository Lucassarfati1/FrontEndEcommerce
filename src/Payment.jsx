import { FcGoogle } from "react-icons/fc";
import { SiMercadopago } from "react-icons/si";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

export function Payment({order}) {
  const [selected, setSelected] = useState(null);
  const [card, setCard] = useState("");
  const [nameCard, setNameCard] = useState("");
  const [maturity, setMaturity] = useState("");
  const [cvv, setCvv] = useState("");
  const [deliveryCost, setDeliveryCost] = useState(3000);
  const [deliveryTime, setDeliveryTime] = useState(2);
  const [discount, setDiscount] = useState(15);
  const [total, setTotal] = useState(100000);
  const [envio, setEnvio] = useState(true);
  const [products, setProducts] = useState([
    /*{
      id_product: 5,
      unitPrice: 23000,
      quantity: 2,
      totalCost: 46000,
    },
    {
      id_product: 42,
      unitPrice: 27000,
      quantity: 2,
      totalCost: 54000,
    },*/
  ]);

  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");
    const userDataParsed = JSON.parse(userData);
    if(!token){
       console.log("sin token");
      alert('Sin iniciar sesion no puedes hacer una compra, inicia sesion y realiza la compra');
      redirect('/')
      return null;
    }
    console.log(userDataParsed)
    console.log(userDataParsed.id)
    const body = {
      id_user: userDataParsed.id,
      nameCard,
      card,
      maturity,
      cvv,
      deliveryTime: parseInt(deliveryTime),
      deliveryCost: parseFloat(deliveryCost),
      discount: parseFloat(discount),
      total: parseFloat(total),
      envio,
      products:order.items,
    };
    console.log(body);
    try {
      const response = await fetch("http://localhost:3000/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      console.log(result);
      if (!response.ok) throw new Error("Pago rechazado");

      
      console.log("Orden creada:", result);
      navigate("/purchaseSuccess");
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error al realizar el pago. Verificá los datos de la tarjeta.");
    }
  };

  const paymentMethods = [
    { id: 'mercadopago', name: 'Mercado Pago', icon: <SiMercadopago size={32} />, color: 'bg-blue-100' },
    { id: 'visa', name: 'Visa', icon: <FaCcVisa size={32} />, color: 'bg-blue-200' },
    { id: 'mastercard', name: 'Mastercard', icon: <FaCcMastercard size={32} />, color: 'bg-red-100' },
    { id: 'Modo', name: 'Modo', icon: <FaMoneyCheckAlt size={32} /> }
  ];

  return (
    <div className="w-full text-black max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Elegí un método de pago</h2>

      <div className="grid grid-cols-4 gap-4">
        {paymentMethods.map(method => (
          <button
            key={method.id}
            onClick={() => setSelected(method.id)}
            className={`flex flex-col h-25 items-center justify-center p-4 mb-5 rounded-3xl border-x-8 transition 
              ${selected === method.id ? 'border-blue-500 shadow-md' : 'border-gray-300'}
              ${method.color}`}
          >
            {method.icon}
            <span className="mt-2 text-sm font-medium">{method.name}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mb-4 text-center text-sm border-b-black text-gray-700">
          Opcion seleccionada: <strong>{paymentMethods.find(m => m.id === selected).name}</strong>
        </div>
      )}

      <form onSubmit={handlePayment} className="max-w-sm mx-auto">
        <input
          type="text"
          placeholder="Nombre en la tarjeta"
          value={nameCard}
          onChange={(e) => setNameCard(e.target.value)}
          className="w-full mb-2 p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="4242 4242 4242 4242"
          value={card}
          onChange={(e) => setCard(e.target.value)}
          className="w-full mb-2 p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="MM/AA"
          value={maturity}
          onChange={(e) => setMaturity(e.target.value)}
          className="w-2/3 mb-2 p-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="w-1/3 mb-2 p-2 border rounded-lg"
        />

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Pay now
        </button>
      </form>
    </div>
  );
}
