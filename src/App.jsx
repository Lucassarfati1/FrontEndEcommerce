import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Promo } from './Promo'
import { Nav } from './Nav'
import {Portada} from './Portada'
import {CarruselDeOfertas} from './CarruselDeOfertas'
import {Footer} from './Footer'

function App() {
  

  return (
  <div className="container">
    <Promo />
    <Nav />
    <Portada />
    <CarruselDeOfertas />
    <Footer />
  </div>
  )
  
}

export default App
