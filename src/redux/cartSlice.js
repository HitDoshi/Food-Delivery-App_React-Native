import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(item => item.id === action.payload.id);
      if (!itemInCart) {
        state.cart.push({...action.payload, quantity: 1});
        state.totalAmount += action.payload.price;
      }

      // console.log(state.totalAmount);
      //   else {
      //     state.cart.push({...action.payload, quantity: 1});
      //   }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      item.quantity++;
      state.totalAmount += item.price;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item.quantity === 1) {
        const removeItem = state.cart.filter(
          item => item.id !== action.payload,
        );
        state.cart = removeItem;
      } else {
        item.quantity--;
      }
      state.totalAmount -= item.price;
    },
    removeItem: (state, action) => {
      state.totalAmount -= action.payload.price * action.payload.quantity;
      const removeItem = state.cart.filter(
        item => item.id !== action.payload.id,
      );
      state.cart = removeItem;
    },
    removeAllItem: (state, action) => {
      state.cart = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  removeAllItem,
} = cartSlice.actions;
