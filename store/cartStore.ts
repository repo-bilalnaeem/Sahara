import {create} from 'zustand'

export const useCart = create((set) =>({
    items:[],

    addProduct: (product: any) =>
        set((state: { items: any[] }) => {
          const existingProductIndex = state.items.findIndex(
            (item) => item.product.key === product.key
          );
    
          if (existingProductIndex !== -1) {
            // Increment quantity if the product already exists
            const updatedItems = [...state.items];
            updatedItems[existingProductIndex].quantity += 1;
            return { items: updatedItems };
          }
    
          // Add new product with quantity 1
          return { items: [...state.items, { product, quantity: 1 }] };
        }),


        increaseQuantity: (productKey: any) =>
          set((state: { items: any[]; }) => {
            const updatedItems = state.items.map((item: { product: { key: any; }; quantity: number; }) => {
              if (item.product.key === productKey) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            });
            return { items: updatedItems };
          }),
      

          // Remove product from the cart
  removeProduct: (productKey: string) =>
    set((state: { items: any[] }) => ({
      items: state.items.filter((item) => item.product.key !== productKey),
    })),

  // Decrease quantity of a product
  decreaseQuantity: (productKey: string) =>
    set((state: { items: any[] }) => {
      const updatedItems = state.items.map((item) => {
        if (item.product.key === productKey) {
          return { ...item, quantity: Math.max(0, item.quantity - 1) };
        }
        return item;
      });

      // Filter out items with quantity 0
      return { items: updatedItems.filter((item) => item.quantity > 0) };
    }),

  // Clear the cart
  clearCart: () => set({ items: [] }),
}))
