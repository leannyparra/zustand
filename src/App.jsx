
import Encabezado from './components/Encabezado'
import ListaProductos from './components/ListaProductos'
import Carrito from './components/Carrito'

function App() {
  return (
    <div className="app">
      <Encabezado />

      <section className="banner">
        <div className="banner-contenido">
          <span className="banner-etiqueta">
            ✦ TU TIENDA ONLINE
          </span>

          <h2>
            Encuentra eso que
            <br />
            te encanta.
          </h2>

          <p>
            Explora productos increíbles, agrégalos a tu carrito
            y organiza tu compra en un solo lugar.
          </p>
        </div>

        <div className="banner-decoracion" aria-hidden="true">
          
        </div>
      </section>

      <main className="contenido">
        <ListaProductos />
        <Carrito />
      </main>

      <footer className="pie">
        Hecho con usando React y Zustand
      </footer>
    </div>
  )
}

export default App
