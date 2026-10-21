
import { useCarritoStore } from '../store/useCarritoStore'

function Encabezado() {
  const items = useCarritoStore((state) => state.items)

  const totalUnidades = items.reduce(
    (total, item) => total + item.cantidad,
    0
  )

  return (
    <header className="encabezado">
      <div className="marca">
        <div className="marca-icono"></div>

        <div>
          <h1>Verde Market</h1>
          <p>Tu próxima compra empieza aquí</p>
        </div>
      </div>

      <div className="carrito-indicador">
        <span role="img" aria-label="Carrito">
        </span>

        <span>{totalUnidades}</span>
      </div>
    </header>
  )
}

export default Encabezado
