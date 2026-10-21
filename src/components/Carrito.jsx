
import { useCarritoStore } from '../store/useCarritoStore'

function Carrito() {
  // Obtenemos los datos y las acciones del carrito
  const items = useCarritoStore((state) => state.items)
  const eliminarProducto = useCarritoStore(
    (state) => state.eliminarProducto
  )
  const vaciarCarrito = useCarritoStore(
    (state) => state.vaciarCarrito
  )

  // Calculamos el total a pagar
  const total = items.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  )

  // Si no hay productos, mostramos este mensaje
  if (items.length === 0) {
    return (
      <section className="panel">
        <h2>Carrito</h2>
        <p className="vacio">Tu carrito está vacío</p>
      </section>
    )
  }

  // Si hay productos, mostramos la lista y el total
  return (
    <section className="panel">
      <h2>Carrito</h2>

      {items.map((item) => (
        <div key={item.id} className="fila">
          <div>
            <p className="fila-nombre">{item.nombre}</p>
            <p className="fila-detalle">
              {item.cantidad} x $
              {item.precio.toLocaleString('es-CO')}
            </p>
          </div>

          <button
            className="btn btn-secundario"
            onClick={() => eliminarProducto(item.id)}
          >
            Quitar
          </button>
        </div>
      ))}

      <div className="total">
        <span>Total</span>
        <strong>${total.toLocaleString('es-CO')}</strong>
      </div>

      <button
        className="btn btn-secundario btn-bloque"
        onClick={vaciarCarrito}
      >
        Vaciar carrito
      </button>
    </section>
  )
}

export default Carrito
