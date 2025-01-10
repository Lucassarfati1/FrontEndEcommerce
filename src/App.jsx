import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Promo } from './Promo'
import { Nav } from './Nav'
import {Portada} from './Portada'
import {CarruselDeOfertas} from './CarruselDeOfertas'
import {Footer} from './Footer'
import {Publ} from './Publ'
import { Description } from './Description'
import { Categories } from './Categories'

function App() {
  

  return (
  <div className="container">
    <Promo />
    <Nav />
    <Portada />
    <CarruselDeOfertas />
    <Publ />
    <Description />
    <CarruselDeOfertas />
    <h1 className='tituloCategories'>¿Que estabas buscando?</h1>
    <Categories />
    <Footer />
  </div>
  )
  
}

export default App
