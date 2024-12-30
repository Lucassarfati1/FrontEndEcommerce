import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Promo } from './Promo'
import { Nav } from './Nav'
import {Portada} from './Portada'

function App() {
  

  return (
  <div className="container">
    <Promo />
    <Nav />
    <Portada />
  </div>
  )
  
}

export default App
