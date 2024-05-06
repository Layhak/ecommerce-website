import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';
import { CartProductType } from '@/libs/difinition';

const initialState = {
  products: [] as CartProductType[],
  totalPrice: 0 as number,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProductType>) => {
      // state.products.push(action.payload);

      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex >= 0) {
        // Product exists, increment quantity
        state.products[existingProductIndex].quantity =
          (state.products[existingProductIndex].quantity || 0) + 1;
      } else {
        // Product doesn't exist, add it with quantity 1
        state.products.push({ ...action.payload, quantity: 1 });
      }

      // state.totalPrice += action.payload.price;
      state.totalPrice =
        Number(state.totalPrice) + Number(action.payload.price);
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: number; quantity?: number }>
    ) => {
      // // find product by id
      // const product = state.products.find((product) => product.id === action.payload);

      // state.totalPrice -= product?.price || 0;

      // state.products = state.products.filter(
      // 	(product) => product.id !== action.payload
      // );
      const product = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        if (action.payload.quantity) {
          // Remove a specific quantity
          product.quantity = Math.max(
            0,
            (product.quantity || 0) - action.payload.quantity
          );
          state.totalPrice -= product.price * action.payload.quantity;
        } else {
          // Remove the entire product
          state.totalPrice -= product.price * (product.quantity || 0);
          state.products = state.products.filter(
            (product) => product.id !== action.payload.id
          );
        }
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        product.quantity = (product.quantity || 0) + 1;
        state.totalPrice = Number(state.totalPrice) + Number(product.price);
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product && (product.quantity || 0) > 1) {
        product.quantity = (product.quantity || 0) - 1;

        state.totalPrice = Number(state.totalPrice) - Number(product.price);
      }
    },
  },
});

// export actions
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

// create selector
export const selectProducts = (state: RootState) => state.cart.products;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
