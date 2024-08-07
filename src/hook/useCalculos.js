import { useEffect, useState } from 'react';

const useCalculos = (skuData, tipoPago) => {
  const [subTotalVenta, setSubTotalVenta] = useState(0);
  const [descuentos, setDescuentos] = useState(0);
  const [totalVenta, setTotalVenta] = useState(0);

  // Calcula el subtotal cuando cambia skuData
  useEffect(() => {
    const total = skuData.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    setSubTotalVenta(total);
  }, [skuData]);

// Calcula los descuentos cuando cambia subTotalVenta o tipoPago
useEffect(() => {
    
    let descuento = 0;
    switch (tipoPago) {
      case 'Efectivo':
        descuento = subTotalVenta * 0.1; // 10% de descuento para pagos en efectivo
        break;
      case 'Debito':
        descuento = subTotalVenta * 0.05; // 5% de descuento para pagos con tarjeta de débito
        break;
      case 'Transferencia':
        descuento = subTotalVenta * 0.08; // 8% de descuento para pagos con transferencia
        break;
      default:
        descuento = 0; // Sin descuento por defecto
        break;
    }
    setDescuentos(descuento);
  }, [subTotalVenta, tipoPago]);

  // Calcula el total de la venta cuando cambian subTotalVenta o descuentos
  useEffect(() => {
    const total = subTotalVenta - descuentos;
    setTotalVenta(total);
  }, [subTotalVenta, descuentos]);

  return { subTotalVenta, descuentos, totalVenta };
};

export default useCalculos;

