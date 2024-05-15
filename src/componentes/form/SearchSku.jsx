"use client"

import { useState, useEffect } from 'react';
import { IoList } from "react-icons/io5";
import '../../estilos/SearchSku.css';
import { useFetchSku } from '../../hook/useFetchSku';

const getFiltroSku = (query, items) => {
  if (!query) {
    return [];
  }
  
  return items.filter(item => {
    // Verifica si el query coincide con el nombre o el id del cliente
    return item.nombre.toLowerCase().includes(query.toLowerCase()) || item.id.toString() === query;
  });
}

export const SearchSku = ({onSkuSelect, resetearSku}) => {
  const [query, setQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false); // Estado para controlar la visibilidad del <ul>
  const [selectedItem, setSelectedItem] = useState(""); // Estado para almacenar el ítem seleccionado
  const [selectedSku, setSelectedSku] = useState(""); // State to store selected item data

  const data = useFetchSku(process.env.NEXT_PUBLIC_API_URL);
  const items = data || [];


  const filtroSku = getFiltroSku(query, items);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setShowOptions(inputValue.trim().length > 0); // Mostrar opciones solo si hay texto en el input
  };

  const handleOptionSelect = (item) => {
    setQuery(`${item.id} - ${item.nombre}`);
    setShowOptions(false); // Ocultar opciones al seleccionar una
    onSkuSelect(item);  
  };

  useEffect(() => {
    // Si se llama a la función 'resetear', restablece el estado del componente
    if (resetearSku) {
      setQuery("");
      setShowOptions(false);
    }
  }, [resetearSku]);

  return (
    <>
      <label htmlFor="input-sku" className="form-label">Producto</label>
      <div className='input-wrapper'>
        <IoList id='search-icon' />
        <input
          type='text'
          className='form-control'
          id='input-sku'
          placeholder='Buscar Producto'
          value={query}
          onChange={handleInputChange}  
        />
      </div>   
      <div className='select-sku'>    
      {showOptions && (
        <ul>
          {filtroSku.map((item) => (
            <p key={item.id} onClick={() => handleOptionSelect(item)}>
              {item.id} - {item.nombre}
              
            </p>
          ))}
        </ul>
      )}
      </div>

    </>
  );
};