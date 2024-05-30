import { useState } from "react";
import { useForm } from "react-hook-form";
import { SearchBar } from "./SearchClientes";
import { SearchSku } from "./SearchSku";

export const Factura = ({ handleDataTableSubmit, handleTipoPagoChange }) => {
  const {
    register,
    handleSubmit,
    //watch, // Retrieves the current form state
    formState: { errors },
    reset,
  } = useForm();

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null); // State to store the selected customer
  const [skuSeleccionado, setSkuSeleccionado] = useState(null); // State to store the selected SKU
  const [ventaData, setVentaData] = useState(null);

  const onSubmit = handleSubmit((data) => {
    //console.log({ ...data, /*cliente: clienteSeleccionado, sku: skuSeleccionado*/ });
    if (!clienteSeleccionado) {
      console.log("Por favor seleccione un cliente.");
      return;
    }

    if (!ventaData) {
      setVentaData({
        fecha: data.fecha,
        caja: data.caja,
        tipo_venta: data.venta,
        'medio_pago': data.medio_pago,
        'tipo_pago': data.tipo_pago,
      });
    }

    const skuData = [{
      id: skuSeleccionado.id,
      nombre: skuSeleccionado.nombre,
      ume: skuSeleccionado.ume,
      precio: data.precio,
      cantidad: data.cantidad,
    }];

    const unificadoData = {
      sku: skuData,
      cliente: clienteSeleccionado,
      venta: ventaData,
    };

    handleDataTableSubmit([...skuData]);
    handleTipoPagoChange(data.tipo_pago);
    handleDataTableSku(skuData);
    // Aquí puedes enviar los datos a tu base de datos
    enviarDatosABaseDeDatos(unificadoData);

    reset({ precio: "", cantidad: "" });
    resetearSearchSku();
  });

  const handleClienteSelect = (cliente) => {
    setClienteSeleccionado(cliente);
  };

  const handleSkuSelect = (sku) => {
    setSkuSeleccionado(sku);
  };

  const handleDataTableSku = (skuData) => {
    /*console.log("Envio datos SKU a Tabla:", skuData)*/ return skuData;
  };

  const enviarDatosABaseDeDatos = (data) => {
    // Aquí puedes implementar la lógica para enviar los datos a tu base de datos
    console.log("Enviando datos a la base de datos:", data);
  };

  const resetearSearchSku = () => {
    setSkuSeleccionado(null);
  };


  return (
    <>
      <div className="form-container-fact">
        <form onSubmit={onSubmit}>
          { /*  Seccion de Items SKU */}
          <div className="row">
            <div className="col-6">
              <SearchSku
                register={register}
                onSkuSelect={handleSkuSelect}
                resetearSku={resetearSearchSku}
              />
            </div>
            <div className="col">
              <label htmlFor="input-precio" className="form-label">
                Precio
              </label>
              <input
                className="form-control"
                type="number"
                id="input-precio"
                placeholder="$ 0,00"
                {...register("precio", { valueAsNumber: true }, { required: true})}
              />
            </div>
            <div className="col">
              <label htmlFor="input-cantidad" className="form-label">
                Cantidad
              </label>
              <input
                className="form-control"
                type="number"
                id="input-cantidad"
                placeholder="0"
                {...register("cantidad", { valueAsNumber: true }, { required: true })}
              />
            </div>
            <div className="col">
              <button type="submit" className="btn btn-success btn-lg">
                Agregar Producto
              </button>
            </div>
          </div>                    
          { /* Fin Seccion SKU */}
          <hr />
          { /* Seccion Venta 1 */ }
          <div className="row">
            <div className="col">
              <label htmlFor="input-fecha" className="form-label">Fecha</label>
              <input
                type="date"
                className="form-control"
                id="input-fecha"
                {...register("fecha", { valueAsDate: true })}
              />
            </div>
            <div className="col-6">
              <SearchBar register={register} onSelect={handleClienteSelect} />
            </div>
            <div className="col">
              <label htmlFor="select-caja" className="form-label">Nº Caja</label>
              <select
                className="form-select"
                id="select-caja"
                {...register("caja")}
              >
                <option value="">Seleccionar</option>
                <option value="Caja 1">Caja 1</option>
                <option value="Caja 2">Caja 2</option>
                <option value="Caja 3">Caja 3</option>
              </select>
            </div>
          </div>
          { /* Fin Seccion Venta 1 */ }
          <hr />
          { /* Seccion Venta 2 */ }
          <div className="row">
            <div className="col">
              <label htmlFor="select-tipo-venta" className="form-label">
                Tipo de Venta
              </label>
              <select
                className="form-control"
                id="select-tipo-venta"
                {...register("venta")}
              >
                <option value="">Seleccionar</option>
                <option value="Presupuesto">Presupuesto</option>
                <option value="Fact A">Fact A</option>
                <option value="Fact B">Fact B</option>
                <option value="Fact C">Fact C</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="select-tipo-pago" className="form-label">
                Tipo de pago
              </label>
              <select
                className="form-control"
                id="select-tipo-pago"
                {...register("tipo_pago")}
              >
                <option value="">Seleccionar</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Debito">Debito</option>
                <option value="Credito">Credito</option>
                <option value="Transferencia">Transferencia</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="select-medio-pago" className="form-label">
                Medio de Pago
              </label>
              <select
                className="form-control"
                id="select-medio-pago"
                {...register("medio_pago")}
              >
                <option value="">Seleccionar</option>
                <hr />
                <optgroup label="Tarjetas">
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Naranja">Naranja</option>
                  <option value="Cabal">Cabal</option>
                </optgroup>
                <hr />
                <optgroup label="Transferencias">
                  <option value="Mercado Pago">Mercado Pago</option>
                  <option value="Onda">Onda</option>
                  <option value="Naranja X">Naranja X</option>
                  <option value="Uala ">Uala</option>
                  <option value="Otro ">Otro</option>
                </optgroup>
              </select>
            </div>
          </div>
          { /* Fin Seccion Venta 2 */ }
          <hr />
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-success btn-lg">
                Cerrar Venta
              </button>
            </div>
          </div>
          { /*<div>
            <pre>{JSON.stringify(watch(), null, 2)}</pre>
          </div> */}
        </form>
      </div>
    </>
  );
};
