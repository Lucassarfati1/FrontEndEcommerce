import React from 'react';

export function Portada(props){
    return <div className='portada' >
       <img src="/portada2.jpg" alt="" />
       <div className='rectangulo'>
        <button className='comprarBoton' value="Comprar" ></button>
       </div>
    </div>
}