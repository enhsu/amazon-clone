import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "~/store";
import type { AddProduct } from "~/components/Product";

export type Item = AddProduct;

interface CartState {
  items: Item[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      if (state.items.find((item) => item.id === action.payload.id)) {
        const newItems = [...state.items];
        state.items = newItems.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
          }
          return item;
        });
      } else {
        state.items = [...state.items, action.payload];
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const newItems = [...state.items];

      if (index >= 0) {
        // item exist
        newItems.splice(index, 1);
      } else {
        // item not exist
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it's not in Cart`
        );
      }

      state.items = newItems;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectItems = (state: RootState) => state.cart.items;
export const selectTotal = (state: RootState) =>
  state.cart.items.reduce(
    (total: number, item: Item) => total + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
