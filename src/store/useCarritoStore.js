
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Creamos el estado global del carrito
export const useCarritoStore = create(
  persist(
    (set) => ({
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

    
  // Disminuye la cantidad de un producto
  disminuirCantidad: (id) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        // Si la cantidad llega a cero, quitamos el producto
        .filter((item) => item.cantidad > 0),
    })),


  // Elimina todos los productos del carrito
  vaciarCarrito: () => set({ items: [] }),
}),
    {
      name: 'carrito-compras',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
