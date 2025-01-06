import React from 'react';

export function Portada(props) {
    return (
        <div className='portada'>
            <img src="/portada2.jpg" alt="Portada" />
            <div className='divBotones'>
            <button className='comprarBoton izquierda'>Lo más nuevo</button>
                <button className='comprarBoton centro'>Ofertas</button>
                <button className='comprarBoton derecha'>Todo</button>
            </div>
        </div>

    );
}
