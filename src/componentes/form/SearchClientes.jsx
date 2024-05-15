"use client"

import { useState } from 'react';
import { MdPersonSearch } from "react-icons/md";
import '../../estilos/SearchCliente.css';
import { ItemsClientes } from '../../hook/useClientes';

const getFiltroClientes = (query, clientes) => {
  if (!query) {
    return [];
  }
  
  return clientes.filter(cliente => {
    // Verifica si el query coincide con el nombre o el id del cliente
    return cliente.nombre.toLowerCase().includes(query.toLowerCase()) || cliente.id.toString() === query;
  });
}

export const SearchBar = ({register, onSelect}) => {
  const [query, setQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false); // Estado para controlar la visibilidad del <ul>
  const data = ItemsClientes();
  const clientes = data || [];

  const filtroClientes = getFiltroClientes(query, clientes);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setShowOptions(inputValue.trim().length > 0); // Mostrar opciones solo si hay texto en el input
  };

  const handleOptionSelect = (cliente) => {
    setQuery(`${cliente.id} - ${cliente.nombre}`);
    setShowOptions(false); // Ocultar opciones al seleccionar una
    onSelect(cliente); // Llamar a la función de devolución de llamada con los datos del cliente
  };

  return (
    <>
        <label htmlFor="input-nombre" className="form-label">Cliente</label>
      <div className='input-wrapper'>
        <MdPersonSearch id='search-icon' />
        <input
          type='text'
          className='form-control'
          id='input-nombre'
          placeholder='Buscar Cliente'
          value={query}
          onChange={handleInputChange}
          
        />
      </div>   
      <div className='select-cliente'>    
      {showOptions && (
        <ul>
          {filtroClientes.map((cliente) => (
            <p key={cliente.id} onClick={() => handleOptionSelect(cliente)}>
              {cliente.id} - {cliente.nombre}
              
            </p>
          ))}
        </ul>
      )}
      </div>
    </>
  );
};


