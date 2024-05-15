"use client"

import { Factura } from './form/Factura'

export const FormDatos = () => {

    return (
        <>
            <div className="container">
                <form id="form-datos">
                    <div className="row">
                        <div className="col">
                          <Factura />
                         </div>   
                        </div>
                        
                    <div className="row">
                        <button type="button" className="btn btn-success btn-sm" >Agregar datos</button>
                    </div> 
                </form>
            </div>

        </>
    )
}
