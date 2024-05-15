"use client"

import { useState } from "react"
import { Factura } from "../../../src/componentes/form/Factura"
import { TableData } from "../../../src/componentes/form/Table"

export default function Operaciones() {

    const [formData, setFormData] = useState([]);
    const [tipoPago, setTipoPago] = useState(""); // Estado para almacenar el tipo de pago


    const handleDataTableSubmit = (data) => {
      setFormData([...formData, ...data]);
    };

    const handleItemBorrado = (actRow) => {
      setFormData(actRow);
    };

    const handleTipoPagoChange = (tipoPagoSeleccionado) => {
      setTipoPago(tipoPagoSeleccionado);
    };

    return (
    <>
    <div className="container-inputs-fact" id="container-vta-forms"> 
    <h1>Facturación</h1>   
    <Factura 
    handleDataTableSubmit={handleDataTableSubmit}
    handleTipoPagoChange={handleTipoPagoChange}
    />
    <hr />
    { <TableData 
      skuData={formData} 
      onItemBorrado={handleItemBorrado} 
      tipoPago={tipoPago} 
    /> }
    </div>
    <hr />

    </>
    )
}