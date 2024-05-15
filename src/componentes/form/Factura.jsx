import { useState } from "react";
import { useForm } from "react-hook-form";
import { SearchBar } from "./SearchClientes";
import { SearchSku } from "./SearchSku";

export const Factura = ({ handleDataTableSubmit, handleTipoPagoChange }) => {
  const {
    register,
    handleSubmit,
    watch, // Retrieves the current form state
    formState: { errors },
    reset,
  } = useForm();

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null); // State to store the selected customer
  const [skuSeleccionado, setSkuSeleccionado] = useState(null); // State to store the selected SKU

  const onSubmit = handleSubmit((data) => {
    console.log({ ...data, /*cliente: clienteSeleccionado, sku: skuSeleccionado*/ });

    //DATOS DE SKUs PARA VISTA DE TABLA //
    const {id, nombre, ume} = skuSeleccionado;
    const {idC, nombreC, cuit, categoria } = clienteSeleccionado;

    const skuData = [{
      id: id,
      nombre: nombre,
      ume: ume, // Assuming "sku" is the intended field here
      precio: data.precio,
      cantidad: data.cantidad,
    }];

    const clienteData = [{
      id: idC,
      nombre: nombreC,
      cuit: cuit,
      categoria: categoria,
    }];

    const ventaData = [{
      fecha: data.fecha,
      caja: data.caja,
      venta: data.venta,
      'medio_pago': data.medio_pago,
      'tipo_pago': data.tipo_pago,
    }];

    handleDataTableSubmit([...skuData]); // Pass filtered data
    handleTipoPagoChange(data.tipo_pago);
    handleDataTableSku(skuData); // Assuming this function exists to handle SKU data
    //handleDataTableCliente(clienteData);
    handleDataTableVenta(ventaData);
    reset({ precio: "", cantidad: "" }); // Clear the form after submission
    resetearSearchSku();
  });


  const handleClienteSelect = (cliente) => {
    setClienteSeleccionado(cliente); // Update state with selected customer data
  };

  const handleSkuSelect = (sku) => {
    setSkuSeleccionado(sku); // Update state with selected SKU data
  };

  const handleDataTableSku = (skuData) => {
    console.log("Envio datos SKU a Tabla:", skuData);
  };

  const handleDataTableCliente = (clienteData) => {
    console.log('Envio de datos de CLIENTES a Tabla:', clienteData);
  };

  const handleDataTableVenta = (ventaData) => {
    console.log('Envio de datos de Venta a Tabla:', ventaData);
  };

  const resetearSearchSku = () => {
    setSkuSeleccionado("");
  };


  return (
    <>
      <div className="form-container-fact">
        <form onSubmit={onSubmit}>
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
            <div className="col-5">
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
                  <option value="Uala ">Uala</option>
                  <option value="Otro ">Otro</option>
                </optgroup>
              </select>
            </div>
          </div>
          <hr />
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
                {...register("precio", { valueAsNumber: true })}
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
                {...register("cantidad", { valueAsNumber: true })}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-success btn-lg">
                Cargar datos Cliente
              </button>
            </div>
            <div className="col">
              <button type="submit" className="btn btn-success btn-lg">
                Agregar Producto
              </button>
            </div>
          </div>
          <div>
            <pre>{JSON.stringify(watch(), null, 2)}</pre>
          </div>
        </form>
      </div>
    </>
  );
};
