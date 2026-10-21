
import { create } from 'zustand'

// Creamos el estado global del carrito
export const useCarritoStore = create((set) => ({
  // Aquí se guardan los productos agregados
  items: [],

  // Agrega un producto al carrito
  agregarProducto: (producto) =>
    set((state) => {
      // Revisamos si ya existe ese producto
      const existe = state.items.find(
        (item) => item.id === producto.id
      )

      // Si existe, aumentamos su cantidad
      if (existe) {
        return {
          items: state.items.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        }
      }

      // Si no existe, lo agregamos con cantidad 1
      return {
        items: [...state.items, { ...producto, cantidad: 1 }],
      }
    }),

  // Elimina un producto del carrito
  eliminarProducto: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  // Elimina todos los productos del carrito
  vaciarCarrito: () => set({ items: [] }),
}))
