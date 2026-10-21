
import { useEffect, useState } from 'react'
import { useCarritoStore } from '../store/useCarritoStore'

function ListaProductos() {
  // Guardamos los productos que llegan desde la API
  const [productos, setProductos] = useState([])

  // Controlamos si los productos todavía están cargando
  const [cargando, setCargando] = useState(true)

  // Obtenemos la función para agregar productos al carrito
  const agregarProducto = useCarritoStore(
    (state) => state.agregarProducto
  )

  // Consultamos los productos de la API cuando se carga el componente
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((respuesta) => {
        // Comprobamos si la respuesta fue correcta
        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar los productos')
        }

        // Convertimos la respuesta a formato JSON
        return respuesta.json()
      })
      .then((datos) => {
        // Adaptamos los datos al formato de nuestra tienda
        const productosAdaptados = datos.map((producto) => ({
          id: producto.id,
          nombre: producto.title,
          precio: producto.price * 4000,
        }))

        // Guardamos los productos recibidos
        setProductos(productosAdaptados)
      })
      .catch((error) => {
        // Mostramos el error si algo falla
        console.error('Error al cargar productos:', error)
      })
      .finally(() => {
        // Terminamos el estado de carga
        setCargando(false)
      })
  }, [])

  // Mostramos un mensaje mientras llegan los productos
  if (cargando) {
    return (
      <section className="panel">
        <h2>Productos</h2>
        <p>Cargando productos...</p>
      </section>
    )
  }

  // Mostramos la lista de productos
  return (
    <section className="panel">
      <h2>Productos</h2>

      {productos.length === 0 ? (
        <p>No se pudieron cargar los productos. Intenta nuevamente.</p>
      ) : (
        productos.map((producto) => (
          <div key={producto.id} className="fila">
            <div>
              <p className="fila-nombre">{producto.nombre}</p>

              <p className="fila-detalle">
                ${producto.precio.toLocaleString('es-CO')}
              </p>
            </div>

            <button
              className="btn btn-primario"
              onClick={() => agregarProducto(producto)}
            >
              Agregar
            </button>
          </div>
        ))
      )}
    </section>
  )
}

export default ListaProductos
