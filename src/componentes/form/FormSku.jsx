"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
//import useForm from '../../hook/useForm';
import { SearchSku } from '../../../src/componentes/form/SearchSku';
import { InputPrecio } from '../../../src/componentes/form/InputPrecio';
import { InputCantidad } from '../../../src/componentes/form/InputCantidad';
import { BotonSku } from '../../../src/componentes/form/BotonSku';
import { TableData } from '../../../src/componentes/form/Table';

const Formulario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ mode: 'all' }); // Use 'all' mode for better validation
  
  const [itemsAgregados, setItemsAgregados] = useState([]);

  const onSubmit = (data) => {
    setItemsAgregados([...itemsAgregados, data]); // Add new item
    setValue('id', '');
    setValue('nombre', ''); // Clear name field after submission
    setValue('precio', ''); // Clear price field after submission
    setValue('cantidad', ''); // Clear quantity field after submission
    console.log("Datos del formulario:", data); // Imprimir datos en la consola   
  };

  const handleItemBorrado = (actualizarItems) => {
    setItemsAgregados(actualizarItems);
  };

  const selectedSku = watch('sku'); // Watch for sku changes
  const selectedProduct = watch(['id', 'nombre', 'ume', 'precio']); // Watch for all relevant product data
 
  return (
    <>
      <div className='prueba-search-container'>
        <h2>Modulo de Reportes</h2>
        <div className='search-container'>
          <form onSubmit={handleSubmit(onSubmit)} id="formulario">
            <div className='row'>
              <div className='col-6'>
                {/*<SearchSku
               {...register('sku', { required: true })}
               onUMESelect={(ume) => setValue('ume', ume)}
               onReset={() => setValue('sku', '')}
               onSkuSelect={(selectedProduct) => setValue('...allProductFields', selectedProduct)} // Pass the entire selected product object
                />*/}
              </div>
              <InputPrecio
                {...register('precio', { required: true, validate: value => value > 0 || 'Precio debe ser positivo' })}
              />
              <InputCantidad
               {...register('cantidad', { required: true, validate: value => value > 0 || 'Cantidad debe ser positiva' })}
              />
            </div>
            <BotonSku 
              /*{...register('nombre')} // Register name for hidden field (optional)
              {...register('id')} // Register id for hidden field (optional)
              sku={selectedSku} // Pass selectedSku from watch*/
              precio={watch('precio')}
              cantidad={watch('cantidad')}
              onItemBorrado={handleItemBorrado}
            />
          <div className='row'>
            <TableData
             itemsAgregados={itemsAgregados} onItemBorrado={handleItemBorrado}              
            />
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Formulario;
