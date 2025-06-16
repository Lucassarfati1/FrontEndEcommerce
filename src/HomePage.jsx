// HomePage.jsx
import { Portada } from './Portada'
import { CarruselDeOfertas } from './CarruselDeOfertas'
import { Publ } from './Publ'
import { Description } from './Description'
import { Categories } from './Categories'
import './tailwind.css'; 


export function HomePage() {
  return (
    <>

      <Portada />
      <div class="text-center bg-black text-blue-600 font-extrabold">
      ¡Tailwind funciona!
    </div>
      <CarruselDeOfertas />
      <Publ />
      <Description />
      <CarruselDeOfertas />
      <h1 className='tituloCategories'>¿Qué estabas buscando?</h1>
      <Categories />
     
    </>
  )
}