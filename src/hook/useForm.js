import { useState } from 'react';

export default function useForm() {
  const [formData, setFormData] = useState({
    onSkuSelect: '',
    //selectedSku: '',
    //sku: '',
    nombre: '',
    ume: '',
    precio: '',
    cantidad: '',
    itemsAgregados: [],
    });

    const handleChange = (name, value) => {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  

  const agregarItem = () => {
    const { id, nombre, ume, precio, cantidad, itemsAgregados } = formData;
    const nuevoItem = { id, nombre, ume, precio, cantidad };
    setFormData({
      ...formData,
      itemsAgregados: [...itemsAgregados, nuevoItem],
      //onSkuSelect:'',
      //sku: '',
      nombre: '',
      id: '',
      ume: '',
      precio: '',
      cantidad: '',
    });
  };

  const handleItemBorrado = (actualizarItems) => {
    setFormData({
      ...formData,
      itemsAgregados: actualizarItems,
    });
  };

  return {
    formData,
    handleChange,
    agregarItem,
    handleItemBorrado,
  };
}
