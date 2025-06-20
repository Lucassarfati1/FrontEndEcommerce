    import { FcGoogle } from "react-icons/fc";
    import { SiMercadopago } from "react-icons/si";
    import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
    import { FaMoneyCheckAlt } from 'react-icons/fa';
    import {useState} from "react";

export function Payment(){

    const [selected, setSelected] = useState(null);
 
    const paymentMethods = [
  { id: 'mercadopago', name: 'Mercado Pago', icon: <SiMercadopago size={32} />, color: 'bg-blue-100' },
  { id: 'visa', name: 'Visa', icon: <FaCcVisa size={32} />, color: 'bg-blue-200' },
  { id: 'mastercard', name: 'Mastercard', icon: <FaCcMastercard size={32} />, color: 'bg-red-100' },
    {id: "Modo", name:"modo", icon: <FaMoneyCheckAlt size={32} />}
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
          Opción seleccionada: <strong>{paymentMethods.find(m => m.id === selected).name}</strong>
        </div>
      )}
      


<form className="max-w-sm mx-auto">
    <label htmlFor="card-number-input" className="sr-only">Card number:</label>
    <div className="relative">
        <input type="text" id="card-number-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="4242 4242 4242 4242" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
            <svg fill="none" className="h-6 text-[#1434CB] dark:text-white" viewBox="0 0 36 21"><path fill="currentColor" d="M23.315 4.773c-2.542 0-4.813 1.3-4.813 3.705 0 2.756 4.028 2.947 4.028 4.332 0 .583-.676 1.105-1.832 1.105-1.64 0-2.866-.73-2.866-.73l-.524 2.426s1.412.616 3.286.616c2.78 0 4.966-1.365 4.966-3.81 0-2.913-4.045-3.097-4.045-4.383 0-.457.555-.957 1.708-.957 1.3 0 2.36.53 2.36.53l.514-2.343s-1.154-.491-2.782-.491zM.062 4.95L0 5.303s1.07.193 2.032.579c1.24.442 1.329.7 1.537 1.499l2.276 8.664h3.05l4.7-11.095h-3.043l-3.02 7.543L6.3 6.1c-.113-.732-.686-1.15-1.386-1.15H.062zm14.757 0l-2.387 11.095h2.902l2.38-11.096h-2.895zm16.187 0c-.7 0-1.07.37-1.342 1.016L25.41 16.045h3.044l.589-1.68h3.708l.358 1.68h2.685L33.453 4.95h-2.447zm.396 2.997l.902 4.164h-2.417l1.515-4.164z"/></svg>
        </div>
    </div>
    <div className="grid grid-cols-3 gap-4 my-4">
        <div className="relative max-w-sm col-span-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
            </div>
            <label htmlFor="card-expiration-input" className="sr-only">Card expiration date:</label>
            <input  data-datepicker="true" id="card-expiration-input" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="12/23" required />
        </div>
        <div className="col-span-1">
            <label htmlFor="cvv-input" className="sr-only">Card CVV code:</label>
            <input type="number" id="cvv-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CVV" required />
        </div>
    </div>
    <button type="submit" onClick={navigate('/PurchaseSuccess')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Pay now</button>
</form>

    </div>);
}