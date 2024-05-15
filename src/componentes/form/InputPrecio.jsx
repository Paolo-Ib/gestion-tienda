import { useState } from "react"

export const InputPrecio = ({onPrecioSelect}) => {

const [precioSelect, setPrecioSelect ] = useState("");


const onPrecioIngresado = (e) => {
    setPrecioSelect(e.target.value);
    onPrecioSelect(e.target.value);
    
};
  return (
    <>
    <div className='col'>
    <label htmlFor="input-precio" className="form-label">Precio</label>
    <input 
    className="form-control" 
    type="number" 
    id="input-precio" 
    placeholder="$ 0,00"  
    value={precioSelect}
    onChange={onPrecioIngresado}
    required="true"
    />
    
    </div>
    </>         
  )
};

