import React from 'react';
import { NavBarLat} from '../../src/componentes/NavBarLat';
//import '../../src/estilos/gral.css';

export default function layoutGestion ({children}) {
  return (
    <>
    <div className='container layout-gestion' >
    <div className='row'>
    <div className='col-2' id="col-nav">
      <NavBarLat />
    </div>
    <div className='col'>
       { children }
    </div>
    </div>
    </div>
    </>
    
  )
}

