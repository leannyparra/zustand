
import { useCarritoStore } from '../store/useCarritoStore'

function Encabezado() {
  // Obtenemos los productos del store
  const items = useCarritoStore((state) => state.items)

  // Sumamos las cantidades de los productos
  const totalUnidades = items.reduce(
    (suma, item) => suma + item.cantidad,
    0
  )

  return (
    <header className="encabezado">
      <h1>Mi Tienda</h1>
      <span className="insignia">{totalUnidades}</span>
    </header>
  )
}

export default Encabezado
