"use client"
import React from 'react';
import { useFetchSku } from '../../hook/useFetchSku';

const ListaSku = () => {
  const jsonData = useFetchSku(process.env.NEXT_PUBLIC_API_URL); // Acceso al JSON devuelto por ItemsClientes

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

export default ListaSku;