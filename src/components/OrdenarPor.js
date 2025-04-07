import React from 'react';
import './OrdenarPor.css';

function OrdenarPor({ setSortBy }) {
  return (
    <div className="ordenar-por">
      <span>Ordenar por:</span>
      <button onClick={() => setSortBy('name')} className="btn">Nombre</button>
      <button onClick={() => setSortBy('age')} className="btn">Edad</button>
      <button onClick={() => setSortBy('country')} className="btn">País</button>
    </div>
  );
}

export default OrdenarPor;
