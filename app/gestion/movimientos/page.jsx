"use client"
import { useState} from 'react';
import { InputPrecio } from '../../../src/componentes/form/InputPrecio';
import { TableData } from '../../../src/componentes/form/Table';
import { BotonSku } from '../../../src/componentes/form/BotonSku';



function PageMovimientos() {

  const [producto, setProducto ] = useState("");
  const [precio, setPrecio ] = useState("");
  const [cantidad, setCantidad ] = useState("");
  
  const onPrecioIngresado = (valor) => {
    console.log(valor);
};
  const handleClick = () => {
    const datosTabla = {
      //producto,
      precio,
      //cantidad,
    }; 

  return (
    <>
    <div className='prueba-search-container'>
    <h1>Modulo de Movimientos</h1>
    <div className='search-container'>
      { <InputPrecio />}
      { <BotonSku onClick={handleClick} />}
      <TableData precioIngresado={onPrecioIngresado} /> 
    </div>

    </div>

    </>
  )
}
 }

export default PageMovimientos;   