"use client"
import { useFetchSku } from '../../hook/useFetchSku';

// COLOCAR CONST GETFILTROSKU --8 al 17


export const Sku = ({ register }) => {
  // AGREGAR LINEAS --20 Y 21
  const { data, isLoading, error } = useFetchSku(process.env.NEXT_PUBLIC_API_URL)
  // AGREGAR LINEA --23 al 37
  
  return (
    <div>
    

    {isLoading && <p>Cargando...</p>} {/* Display loading message while fetching */}
    {error && <p>Error: {error.message}</p>} {/* Display error message if encountered */}

    {data && data.length > 0 && ( // Only render select if dato is available
    <>
      <label htmlFor="select-sku" className="form-label">Producto</label>
      <select 
      className='form-control'
      id="select-sku"
      {...register("skuItem")}
      >
        <option value="">Selecciona un producto</option> {/* Default option */}
        {data.map((sku, i) => (
          <option key={i} value={`${sku.id} - ${sku.nombre}`}>
            {sku.id} - {sku.nombre}
          </option>
        ))}
      </select>
      </>
    )}
  </div>
);
}


