import { useState } from "react"

export const InputCantidad = ({onCantSelect}) => {

const [ cantSelect, setCantSelect ] = useState("");


const onCantIngresado = (e) => {
    setCantSelect(e.target.value);
    //onCantSelect(e.target.value);
    
    
};

  return (
    <>
    <div className='col'>
    <label htmlFor="input-cantidad" className="form-label">Cantidad</label>
    <input 
    className="form-control" 
    type="number" 
    id="input-cantidad" 
    placeholder="0,00"  
    value={cantSelect}
    onChange={onCantIngresado}
    required="true"
    />
    </div>
    </>         
  )
}