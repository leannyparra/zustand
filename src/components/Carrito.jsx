
import { useCarritoStore } from '../store/useCarritoStore'

function Carrito() {
  const items = useCarritoStore((state) => state.items)
  const disminuirCantidad = useCarritoStore(
    (state) => state.disminuirCantidad
  )
  const agregarProducto = useCarritoStore(
    (state) => state.agregarProducto
  )
  const eliminarProducto = useCarritoStore(
    (state) => state.eliminarProducto
  )
  const vaciarCarrito = useCarritoStore(
    (state) => state.vaciarCarrito
  )

  const totalUnidades = items.reduce(
    (total, item) => total + item.cantidad,
    0
  )

  const totalCompra = items.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  )

  const formatoPrecio = (precio) =>
    precio.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    })

  return (
    <aside className="panel carrito-panel">
      <div className="panel-encabezado">
        <div>
          <h2 className="panel-titulo">Tu carrito 🛒</h2>
          <p className="panel-subtitulo">
            Revisa lo que elegiste.
          </p>
        </div>

        <span className="contador-productos">
          {totalUnidades} unidades
        </span>
      </div>

      {items.length === 0 ? (
        <div className="carrito-vacio">
          <div className="carrito-vacio-icono">🛍️</div>

          <h3>Tu carrito está vacío</h3>

          <p>
            Todavía no tienes productos.
            <br />
            ¡Explora la tienda y agrega tus favoritos!
          </p>
        </div>
      ) : (
        <>
          <div className="carrito-lista">
            {items.map((item) => (
              <article className="carrito-item" key={item.id}>
                <div className="carrito-imagen">
                  {item.imagen ? (
                    <img src={item.imagen} alt={item.nombre} />
                  ) : (
                    <span>🛍️</span>
                  )}
                </div>

                <div className="carrito-item-contenido">
                  <h3 className="carrito-item-nombre">
                    {item.nombre}
                  </h3>

                  <p className="carrito-item-precio">
                    {formatoPrecio(item.precio)}
                  </p>

                  <p className="carrito-item-subtotal">
                    Subtotal: {formatoPrecio(
                      item.precio * item.cantidad
                    )}
                  </p>

                  <div className="carrito-controles">
                    <button
                      className="btn-cantidad"
                      onClick={() => disminuirCantidad(item.id)}
                      aria-label={`Disminuir cantidad de ${item.nombre}`}
                      title="Disminuir cantidad"
                    >
                      −
                    </button>

                    <span className="cantidad-valor">
                      {item.cantidad}
                    </span>

                    <button
                      className="btn-cantidad"
                      onClick={() => agregarProducto(item)}
                      aria-label={`Aumentar cantidad de ${item.nombre}`}
                      title="Aumentar cantidad"
                    >
                      +
                    </button>

                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarProducto(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="carrito-resumen">
            <div className="resumen-fila">
              <span>Productos diferentes</span>
              <strong>{items.length}</strong>
            </div>

            <div className="resumen-fila">
              <span>Total de unidades</span>
              <strong>{totalUnidades}</strong>
            </div>

            <div className="resumen-fila resumen-total">
              <span>Total de compra</span>
              <strong>{formatoPrecio(totalCompra)}</strong>
            </div>

            <button
              className="btn-vaciar"
              onClick={vaciarCarrito}
            >
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </aside>
  )
}

export default Carrito
