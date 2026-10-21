
import { useEffect, useState } from 'react'
import { useCarritoStore } from '../store/useCarritoStore'

function ListaProductos() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  const agregarProducto = useCarritoStore(
    (state) => state.agregarProducto
  )

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error al cargar productos')
        }

        return respuesta.json()
      })
      .then((datos) => {
        const productosAdaptados = datos.map((producto) => ({
          id: producto.id,
          nombre: producto.title,
          precio: Math.round(producto.price * 4000),
          imagen: producto.image,
          categoria: producto.category,
        }))

        setProductos(productosAdaptados)
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error)
        setError(true)
      })
      .finally(() => {
        setCargando(false)
      })
  }, [])

  return (
    <section className="panel">
      <div className="panel-encabezado">
        <div>
          <h2 className="panel-titulo">Explora productos</h2>
          <p className="panel-subtitulo">
            Encuentra tus favoritos y agrégalos al carrito.
          </p>
        </div>

        {!cargando && !error && (
          <span className="contador-productos">
            {productos.length} productos
          </span>
        )}
      </div>

      {cargando ? (
        <div className="estado-mensaje">
          ✨ Preparando la tienda...
        </div>
      ) : error ? (
        <div className="estado-mensaje">
          No pudimos cargar los productos.
          <br />
          Revisa tu conexión e intenta recargar la página.
        </div>
      ) : (
        <div className="lista-productos">
          {productos.map((producto) => (
            <article className="producto-card" key={producto.id}>
              <div className="producto-imagen">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>

              <div className="producto-info">
                <p className="producto-categoria">
                  {producto.categoria}
                </p>

                <h3 className="producto-nombre">
                  {producto.nombre}
                </h3>

                <p className="producto-precio">
                  {producto.precio.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    maximumFractionDigits: 0,
                  })}
                </p>

                <button
                  className="btn-agregar"
                  onClick={() => agregarProducto(producto)}
                >
                  + Agregar al carrito
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default ListaProductos
