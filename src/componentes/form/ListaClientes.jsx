"use client"
import React from 'react';
import { ItemsClientes } from '../useClientes';

const ListaClientes = () => {
  const jsonData = ItemsClientes(); // Acceso al JSON devuelto por ItemsClientes

  // Usa los datos como desees
  return (
    <div>
      {jsonData.map(item => (
        <div key={item.id}>
          <p><b>Nombre:</b> {item.nombre}</p>
          <p><b>ID:</b> {item.id}</p>
        </div>
      ))}
    </div>
  );
};

export default ListaClientes;



