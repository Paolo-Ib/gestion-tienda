
import useCalculos from '../../hook/useCalculos';

export const TableData = ({ onItemBorrado, skuData, tipoPago }) => {
    const { subTotalVenta, descuentos, totalVenta } = useCalculos(skuData, tipoPago);

    const handleItemDeletion = (index) => {
    const actualizarItems = [...skuData];
       actualizarItems.splice(index, 1);
       onItemBorrado(actualizarItems);
    };              

    return (
        <>
            {
            <table className="table table-success table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col-6">Producto</th>
                    <th scope="col">UME</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Total</th>
                    <th scope="col">Borrar</th>
                </tr>
            </thead>
            <tbody>
                {skuData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.producto}</td>
                        <td>{item.ume}</td>
                        <td>{item.precio}</td>
                        <td>{item.cantidad}</td>
                        <td>{item.precio * item.cantidad}</td>
                        <td>
                            <button onClick={() => handleItemDeletion(index)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th scope="row" colSpan="6">Subtotal: $</th>
                    <td>{subTotalVenta}</td>
                </tr>
                <tr>
                    <th scope="row" colSpan="6">Descuentos: $</th>
                    <td>{descuentos}</td>
                </tr>
                <tr>
                    <th scope="row" colSpan="6">Total de venta: $</th>
                    <td>{totalVenta}</td>
                </tr>
            </tfoot>
        </table>
            };
        </>
    );
};
