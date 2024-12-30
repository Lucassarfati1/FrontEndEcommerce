import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Promo } from './Promo'
import { Nav } from './Nav'

function App() {
  

  return (
  <div className="container">
    <Promo />
    <Nav />
  </div>
  )
  
}

export default App
