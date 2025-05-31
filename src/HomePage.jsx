// HomePage.jsx
import { Portada } from './Portada'
import { CarruselDeOfertas } from './CarruselDeOfertas'
import { Publ } from './Publ'
import { Description } from './Description'
import { Categories } from './Categories'


export function HomePage() {
  return (
    <>

      <Portada />
      <CarruselDeOfertas />
      <Publ />
      <Description />
      <CarruselDeOfertas />
      <h1 className='tituloCategories'>¿Qué estabas buscando?</h1>
      <Categories />
     
    </>
  )
}