"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
//import axios from "axios";
import { SearchBar } from "./SearchClientes";
import { SearchSku } from "./SearchSku";

export const Factura = ({ handleDataTableSubmit, handleTipoPagoChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [skuSeleccionado, setSkuSeleccionado] = useState(null);
  const [skuDataList, setSkuDataList] = useState([]);



  const onSubmitSku = (data) => {
    if (!skuSeleccionado) {
      console.log("Por favor seleccione un SKU.");
      return;
    }

    const skuData = [{
      id: skuSeleccionado.id,
      nombre: skuSeleccionado.nombre,
      ume: skuSeleccionado.ume,
      precio: data.precio,
      cantidad: data.cantidad,
      tipo_pago: data.tipo_pago
    }];

    const newSkuDataList = [/*...skuDataList, */...skuData];
    setSkuDataList(newSkuDataList);
    handleDataTableSubmit(newSkuDataList);
    handleTipoPagoChange(data.tipo_pago);
    reset({ precio: "", cantidad: "" });
    resetearSearchSku();
  };

  const onSubmitVenta = handleSubmit((data) => {
    if (!clienteSeleccionado) {
      console.log("Por favor seleccione un cliente.");
      return;
    }

    const venta = {
      fecha: data.fecha,
      caja: data.caja,
      tipo_venta: data.venta,
      medio_pago: data.medio_pago,
      tipo_pago: data.tipo_pago
    };

    const unificadoData = {
      cliente: clienteSeleccionado,
      venta: venta,
      sku: skuDataList,
    };

    enviarDatosABaseDeDatos(unificadoData);
  });

  const handleClienteSelect = (cliente) => {
    setClienteSeleccionado(cliente);
  };

  const handleSkuSelect = (sku) => {
    setSkuSeleccionado(sku);
  };

  const resetearSearchSku = () => {
    setSkuSeleccionado(null);
  };

  const enviarDatosABaseDeDatos = async (unificadoData) => {
    //event.preventDefault();
    console.log("Datos del formulario:", unificadoData);

    const response = await fetch("/api/auth/loginSheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: unificadoData }),
    });

    if (response.ok) {
      console.log("Datos enviados correctamente");
      // Limpiar formulario o mostrar mensaje de éxito
    } else {
      console.error("Error al enviar datos");
    }
  };

  
  return (
    <>
    <div className="form-container-fact">
      { /* Seccion de Items SKU */ }
      <form onSubmit={handleSubmit(onSubmitSku)}>
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
              {...register("precio", { valueAsNumber: true }, { required: true })}
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
      </form>
      { /* Fin Seccion SKU */ }
      <hr />
      { /* Seccion Venta */ }
      <form onSubmit={onSubmitVenta}>
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
        <hr />
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
                <option value="Uala">Uala</option>
                <option value="Otro">Otro</option>
              </optgroup>
            </select>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <button type="submit" className="btn btn-success btn-lg">
              Cerrar Venta
            </button>
          </div>
        </div>
      </form>
      { /* Fin Seccion Venta */ }
    </div>
  </>
);
};