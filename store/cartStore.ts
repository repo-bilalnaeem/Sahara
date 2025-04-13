import {create} from 'zustand'

interface Product{
  id:string;
  name:string;
  price: number;
  stock: number;
  imageUrl: string
}

export interface CartItem {
  product: Product,
  quantity: number
}

interface CartStore {
  items: CartItem[];
  addProduct: (product: Product) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set) =>({
    items:[],

    addProduct: (product: any) =>
        set((state: { items: any[] }) => {
          const existingProductIndex = state.items.findIndex(
            (item) => item.product.id === product.id
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
            const updatedItems = state.items.map((item: { product: { id: any; }; quantity: number; }) => {
              if (item.product.id === productKey) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            });
            return { items: updatedItems };
          }),
      

          // Remove product from the cart
  removeProduct: (productKey: string) =>
    set((state: { items: any[] }) => ({
      items: state.items.filter((item) => item.product.id !== productKey),
    })),

  // Decrease quantity of a product
  decreaseQuantity: (productKey: string) =>
    set((state: { items: any[] }) => {
      const updatedItems = state.items.map((item) => {
        if (item.product.id === productKey) {
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
