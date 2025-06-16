import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPopup.css';

const CheckoutPopup = ({ cartItems,userAddress, deliveryCost = 1500 }) => {
  const [showModal, setShowModal] = useState(false);
  const [method, setMethod] = useState('pickup');
  const navigate = useNavigate();

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 1);
  const formattedDate = estimatedDate.toLocaleDateString('es-AR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const handleSubmit = () => {
// En Cart.jsx al hacer checkout:
localStorage.setItem("order", JSON.stringify({
  items: cartItems,
  address: userAddress,
  method
}));
  navigate("/order");
};

  return (
    <div className='modalOverlay'>
      <div className='formContainer'>
        <form onSubmit={handleSubmit} className='formularioRetiro'>
          <label>
            <input
              type='radio'
              name='method'
              value='delivery'
              checked={method === 'delivery'}
              onChange={() => setMethod('delivery')}
            />
            Delivery a {userAddress} a solo ${deliveryCost}
          </label>
          <br />
          <label>
            <input
              type='radio'
              name='method'
              value='pickup'
              checked={method === 'pickup'}
              onChange={() => setMethod('pickup')}
            />
            Retiro en showroom lunes a viernes de 09:00 a 18:00 en Libertador 1150
          </label>
          <br /><br />
          <button type="submit">Continuar</button>
        </form>
      </div>
    </div>);
};

export default CheckoutPopup;
