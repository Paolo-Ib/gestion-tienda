//"use client"
import { useEffect, useState }from 'react'


export const TableData = ({ onItemBorrado, skuData, tipoPago }) => {

const [ subTotalVenta, setSubTotalVenta ] = useState(0);
const [ descuentos, setDescuentos ] = useState(0);
const [ totalVenta, setTotalVenta ] = useState(0);

    const handleItemDeletion = (index) => {
    const actualizarItems = [...skuData];
       actualizarItems.splice(index, 1);
       onItemBorrado(actualizarItems);
    };              

    useEffect(() => {
        const total = skuData.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        setSubTotalVenta(total);
    }, [skuData]);

    useEffect(() => {
        // Calcular el descuento basado en el tipo de pago
        let descuento = 0;
        switch (tipoPago) {
          case 'Efectivo':
            descuento = subTotalVenta * 0.1; // 10% de descuento para pagos en efectivo
            break;
          case 'Debito':
            descuento = subTotalVenta * 0.05; // 5% de descuento para pagos con tarjeta de débito
            break;
            case 'Transferencia':
                descuento = subTotalVenta * 0.08; // 8% de descuento para pagos con tarjeta de débito
                break;
          // Agregar casos para otros tipos de pago si es necesario
          default:
            descuento = 0; // Sin descuento por defecto
            break;
        }
        setDescuentos(descuento);
      }, [subTotalVenta, tipoPago]);

      useEffect(() => {
        const total = subTotalVenta - descuentos;
        setTotalVenta(total);
    }, [subTotalVenta, descuentos]);


    return (
        <>
            {//skuData && ( //Se renderiza solo si existe skuData
            <table className="table table-success table-striped table-hover">
                <thead>
                    <tr>
                        <th scope='col'>Id</th>
                        <th scope='col-6'>Producto</th>
                        <th scope='col'>UME</th>
                        <th scope='col'>Precio</th>
                        <th scope='col'>Cantidad</th>
                        <th scope='col'>Total</th>
                        <th scope='col'>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {skuData && skuData.map((item, index) => (
                    <tr key={index}> {/* Add key prop for better performance */}
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.ume}</td>
                        <td>{item.precio}</td>
                        <td>{item.cantidad}</td>
                        <td>{item.precio*item.cantidad}</td>
                        <td>
                        <button onClick={() => handleItemDeletion(index)}>Eliminar</button> {/* Button to trigger deletion */}
                        </td>
                    </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row" colSpan="6">Subtotal: $</th>
                        <td>{ subTotalVenta }</td>
                    </tr>
                    <tr>
                        <th scope="row" colSpan="6">Descuentos: $</th>
                        <td>{ descuentos }</td>
                    </tr>
                    <tr>
                        <th scope="row" colSpan="6">Total de venta: $</th>
                        <td>{ totalVenta }</td>
                    </tr>
                </tfoot>
            </table>
            /*)*/};
        </>
    )
}
